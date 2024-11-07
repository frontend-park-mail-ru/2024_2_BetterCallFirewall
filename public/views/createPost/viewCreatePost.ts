import {
	ACTION_CREATE_POST_TYPES,
	ActionUpdateCreatePost,
} from '../../actions/actionCreatePost';
import { ACTION_FEED_TYPES } from '../../actions/actionFeed';
import { ActionMenuLinkClick } from '../../actions/actionMenu';
import api from '../../api/api';
import { Root } from '../../components';
import {
	CreatePostForm,
	ICreatePostFormConfig,
} from '../../components/CreatePostForm/CreatePostForm';
import dispatcher from '../../dispatcher/dispatcher';
import Validator from '../../modules/validation';
import { ChangeCreatePost } from '../../stores/storeCreatePost';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsCreatePost = {
	createPostForm?: CreatePostForm;
} & ComponentsHome;

export interface ViewCreatePostConfig extends HomeConfig {
	createPostForm: ICreatePostFormConfig;
}

export interface IViewCreatePost extends IViewHome {
	handleChange(change: ChangeCreatePost): void;
}

export class ViewCreatePost extends ViewHome implements IViewCreatePost {
	protected _configCreatePost: ViewCreatePostConfig;
	protected _components: ComponentsCreatePost = {};

	constructor(config: ViewCreatePostConfig, root: Root) {
		super(config, root);
		this._configCreatePost = config;
	}

	handleChange(change: ChangeCreatePost): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_CREATE_POST_TYPES.goToCreatePost:
				this.render();
				break;
			case ACTION_FEED_TYPES.postCreateSuccess:
				this.sendAction(
					new ActionMenuLinkClick({ href: this._profileLinkHref }),
				);
				break;
		}
	}

	render(): void {
		this._render();
		dispatcher.getAction(
			new ActionUpdateCreatePost(this._configCreatePost.createPostForm),
		);
	}

	updateViewCreatePost(data: ViewCreatePostConfig): void {
		this._configCreatePost = data;
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderCreatePostForm();
		this._addHandlers();
	}

	protected _renderCreatePostForm(): void {
		const content = this.content;
		const createPostForm = new CreatePostForm(
			this._configCreatePost.createPostForm,
			content,
		);
		createPostForm.render();
		this._components.createPostForm = createPostForm;
	}

	private get _createPostForm(): CreatePostForm {
		const form = this._components.createPostForm;
		if (!form) {
			throw new Error('form not found');
		}
		return form;
	}

	private _addHandlers() {
		this.content.addHandler(
			this._createPostForm.htmlElement,
			'submit',
			(event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._createPostForm.formData,
					this._createPostForm.form,
				);
				if (formData) {
					if (
						formData.get('text') ||
						(formData.get('file') as File).name
					) {
						api.createPost(formData);
						this._createPostForm.clearError();
					} else {
						this._createPostForm.printError(
							'Пост не должен быть пустым',
						);
					}
				}
			},
		);
		this._addHandlerInput();
	}

	private _addHandlerInput(): void {
        const fileInput = this._createPostForm.fileInput;
		const label = this._createPostForm.label;
        if (fileInput) {
			this.content.addHandler(fileInput, 'click', (event) => {
				const input = event.target as HTMLInputElement; 
                if (input.value) {
					input.value = '';
					event.preventDefault();
				  }
			});
			this.content.addHandler(fileInput, 'change', (event) => {
				const input = event.target as HTMLInputElement;                
                if (input.files && input.files.length > 0) {
					if (label) {
						label.classList.add('active');
						label.textContent = 'Картинка выбрана, нажмите, чтобы отменить';
					}
                } else {
                    label?.classList.remove('active');
					label.textContent = 'Прикрепить картинку';
                }
			});
        }
    }
}

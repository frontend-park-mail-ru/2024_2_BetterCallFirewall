import { ActionMenuLinkClick } from '../../actions/actionMenu';
import { ACTION_POST_EDIT_TYPES } from '../../actions/actionPostEdit';
import api from '../../api/api';
import { Root } from '../../components';
import {
	IPostEditFormConfig,
	PostEditForm,
} from '../../components/PostEditForm/PostEditForm';
import Validator from '../../modules/validation';
import { ChangePostEdit } from '../../stores/storePostEdit';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsPostEdit = {
	postEditForm?: PostEditForm;
} & ComponentsHome;

export interface ViewPostEditConfig extends HomeConfig {
	postEditForm: IPostEditFormConfig;
	postId: number;
}

export interface IViewPostEdit extends IViewHome {
	// handleChange(change: ChangePostEdit): void;
}

export class ViewPostEdit extends ViewHome implements IViewPostEdit {
	protected _configPostEdit: ViewPostEditConfig;
	protected _components: ComponentsPostEdit = {};

	constructor(config: ViewPostEditConfig, root: Root) {
		super(config, root);
		this._configPostEdit = config;
	}

	handleChange(change: ChangePostEdit): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_POST_EDIT_TYPES.requestSuccess:
				this.sendAction(
					new ActionMenuLinkClick({ href: this._profileLinkHref }),
				);
				break;
			case ACTION_POST_EDIT_TYPES.requestFail:
				this.updateViewProfileEdit(change.data);
				break;
			case ACTION_POST_EDIT_TYPES.goToPostEdit:
				this._configPostEdit = Object.assign(
					this._configPostEdit,
					change.data,
				);
				this.render();
				break;
		}
	}

	render(): void {
		this._render();
	}

	updateViewProfileEdit(data: ViewPostEditConfig): void {
		this._configPostEdit = Object.assign(this._configPostEdit, data);
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderPostEditForm();
		this._addHandlers();
	}

	protected _renderPostEditForm(): void {
		const content = this.content;
		const postEditForm = new PostEditForm(
			this._configPostEdit.postEditForm,
			content,
		);
		postEditForm.render();
		this._components.postEditForm = postEditForm;
	}

	private get _postEditForm(): PostEditForm {
		const form = this._components.postEditForm;
		if (!form) {
			throw new Error('postEditForm not found');
		}
		return form;
	}

	private _addHandlers() {
		this.content.addHandler(
			this._postEditForm.htmlElement,
			'submit',
			(event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(this._postEditForm.formData, this._postEditForm.form);
				if (formData) {
					api.editPost(formData, this._configPostEdit.postId);
				}
			},
		);
		
		// this._addHandlerInput();
	}

	private _addHandlerInput(): void {
		const fileInput = this._postEditForm.fileInput;
		const label = this._postEditForm.label;
		const preview = this._postEditForm.img as HTMLImageElement;
		if (fileInput) {
			this.content.addHandler(fileInput, 'click', (event) => {
				const input = event.target as HTMLInputElement;
				if (input.value) {
					input.value = '';
					event.preventDefault();
					label?.classList.remove('active');
					label.textContent = 'Прикрепить картинку';
					preview.src = '';
				}
			});
			this.content.addHandler(fileInput, 'change', (event) => {
				const input = event.target as HTMLInputElement;
				if (input.files && input.files.length > 0) {
					if (label) {
						label.classList.add('active');
						label.textContent =
							'Картинка выбрана, нажмите, чтобы отменить';
					}

					const reader = new FileReader();
					reader.onload = function (e) {
						preview.src = e.target?.result as string;
					};
					reader.readAsDataURL(input.files[0]);
				}
			});
		}
	}
}

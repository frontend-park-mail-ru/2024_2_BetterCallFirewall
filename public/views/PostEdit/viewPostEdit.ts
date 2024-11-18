import { ActionAppGoTo } from '../../actions/actionApp';
import { ACTION_POST_EDIT_TYPES } from '../../actions/actionPostEdit';
import { Root } from '../../components';
import {
	PostEditFormConfig,
	PostEditForm,
} from '../../components/PostEditForm/PostEditForm';
import { ChangePostEdit } from '../../stores/storePostEdit';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsPostEdit = {
	postEditForm?: PostEditForm;
} & ComponentsHome;

export interface ViewPostEditConfig extends HomeConfig {
	postEditForm: PostEditFormConfig;
	postId: number;
}

export class ViewPostEdit extends ViewHome {
	protected _configPostEdit: ViewPostEditConfig;
	protected _components: ComponentsPostEdit = {};

	constructor(config: ViewPostEditConfig, root: Root) {
		super(config, root);
		this._configPostEdit = config;
	}

	get config(): ViewPostEditConfig {
		return this._configPostEdit;
	}

	handleChange(change: ChangePostEdit): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_POST_EDIT_TYPES.requestSuccess:
				// this.sendAction(
				// 	new ActionMenuLinkClick({ href: this._profileLinkHref }),
				// );
				this.sendAction(new ActionAppGoTo(this._profileLinkHref));
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

	update(config: object): void {
		this.updateViewProfileEdit(config as ViewPostEditConfig);
	}

	protected _render(): void {
		super._render();
		this._renderPostEditForm();
		this._addHandlers();
	}

	protected _renderPostEditForm(): void {
		// const content = this.content;
		// const postEditForm = new PostEditForm(
		// 	this._configPostEdit.postEditForm,
		// 	content,
		// );
		// postEditForm.render();
		// this._components.postEditForm = postEditForm;
	}

	private get _postEditForm(): PostEditForm {
		const form = this._components.postEditForm;
		if (!form) {
			throw new Error('postEditForm not found');
		}
		return form;
	}

	private _addHandlers() {
		// this.content.addHandler(
		// 	this._postEditForm.htmlElement,
		// 	'submit',
		// 	(event) => {
		// 		event.preventDefault();
		// 		const validator = new Validator();
		// 		const formData = validator.validateForm(
		// 			this._postEditForm.formData,
		// 			this._postEditForm.form,
		// 		);
		// 		if (formData) {
		// 			api.editPost(formData, this._configPostEdit.postId);
		// 		}
		// 	},
		// );
		// this._addHandlerInput();
	}

	private _addHandlerInput(): void {
		// const fileInput = this._postEditForm.fileInput;
		// const label = this._postEditForm.label;
		// const preview = this._postEditForm.img as HTMLImageElement;
		// if (fileInput) {
		// 	this.content.addHandler(fileInput, 'click', (event) => {
		// 		const input = event.target as HTMLInputElement;
		// 		if (input.value) {
		// 			input.value = '';
		// 			event.preventDefault();
		// 			label?.classList.remove('active');
		// 			label.textContent = 'Прикрепить картинку';
		// 			preview.src = '';
		// 		}
		// 	});
		// 	this.content.addHandler(fileInput, 'change', (event) => {
		// 		const input = event.target as HTMLInputElement;
		// 		if (input.files && input.files.length > 0) {
		// 			if (label) {
		// 				label.classList.add('active');
		// 				label.textContent =
		// 					'Картинка выбрана, нажмите, чтобы отменить';
		// 			}
		// 			const reader = new FileReader();
		// 			reader.onload = function (e) {
		// 				preview.src = e.target?.result as string;
		// 			};
		// 			reader.readAsDataURL(input.files[0]);
		// 		}
		// 	});
		// }
	}
}

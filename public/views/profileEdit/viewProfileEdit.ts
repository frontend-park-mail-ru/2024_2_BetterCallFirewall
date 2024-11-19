import { ActionAppGoTo } from '../../actions/actionApp';
import { ACTION_PROFILE_EDIT_TYPES } from '../../actions/actionProfileEdit';
import api from '../../api/api';
import { Root } from '../../components';
import {
	ProfileEditForm,
	IProfileEditFormConfig,
} from '../../components/ProfileEditForm/ProfileEditForm';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeProfileEdit } from '../../stores/storeProfileEditForm';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsProfileEdit = {
	profileEditForm?: ProfileEditForm;
} & ComponentsHome;

export interface ViewProfileEditConfig extends HomeConfig {
	profileEditForm: IProfileEditFormConfig;
}

export class ViewProfileEdit extends ViewHome {
	protected _configProfileEdit: ViewProfileEditConfig;
	protected _components: ComponentsProfileEdit = {};

	constructor(config: ViewProfileEditConfig, root: Root) {
		super(config, root);
		this._configProfileEdit = config;
	}

	get config(): ViewProfileEditConfig {
		return this._configProfileEdit;
	}

	handleChange(change: ChangeProfileEdit): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_PROFILE_EDIT_TYPES.requestFail:
				this.updateViewProfileEdit(change.data);
				break;
			case ACTION_PROFILE_EDIT_TYPES.requestSuccess:
				this.sendAction(new ActionAppGoTo(this._profileLinkHref));
				break;
			case ACTION_PROFILE_EDIT_TYPES.goToProfileEdit:
				this._configProfileEdit = Object.assign(
					this._configProfileEdit,
					change.data,
				);
				this.render();
				break;
		}
	}

	render(): void {
		this._render();
	}

	updateViewProfileEdit(data: ViewProfileEditConfig): void {
		this._configProfileEdit = Object.assign(this._configProfileEdit, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderProfileEditForm();

		const rootVNode = this._root.vnode;

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderProfileEditForm(): void {
		this._components.profileEditForm = new ProfileEditForm(
			this._configProfileEdit.profileEditForm,
			this.content,
		);
	}

	private get _profileEditForm(): ProfileEditForm {
		const form = this._components.profileEditForm;
		if (!form) {
			throw new Error('profileEditForm not found');
		}
		return form;
	}

	protected _addHandlers() {
		super._addHandlers();

		this._profileEditForm.vnode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._profileEditForm.formData,
					this._profileEditForm.form,
				);
				if (formData) {
					api.editProfile(formData);
				}
			},
		});
		this._addHandlerInput();
	}

	private _addHandlerInput(): void {
		this._profileEditForm.fileInputVNode.handlers.push(
			{
				event: 'click',
				callback: (event) => {
					const label = this._profileEditForm.label;
					const preview = this._profileEditForm
						.img as HTMLImageElement;
					const input = event.target as HTMLInputElement;
					if (input.value) {
						input.value = '';
						event.preventDefault();
						label?.classList.remove('active');
						label.textContent = 'Прикрепить картинку';
						preview.src = '';
					}
				},
			},
			{
				event: 'change',
				callback: (event) => {
					const label = this._profileEditForm.label;
					const preview = this._profileEditForm
						.img as HTMLImageElement;
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
				},
			},
		);
	}
}

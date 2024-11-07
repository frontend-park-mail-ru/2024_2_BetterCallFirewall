import { ActionMenuLinkClick } from '../../actions/actionMenu';
import { ACTION_PROFILE_EDIT_TYPES } from '../../actions/actionProfileEdit';
import api from '../../api/api';
import { Root } from '../../components';
import {
	ProfileEditForm,
	IProfileEditFormConfig,
} from '../../components/ProfileEditForm/ProfileEditForm';
import Validator from '../../modules/validation';
import { ChangeProfileEdit } from '../../stores/storeProfileEditForm';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsProfileEdit = {
	profileEditForm?: ProfileEditForm;
} & ComponentsHome;

export interface ViewProfileEditConfig extends HomeConfig {
	profileEditForm: IProfileEditFormConfig;
}

export interface IViewProfileEdit extends IViewHome {
	handleChange(change: ChangeProfileEdit): void;
}

export class ViewProfileEdit extends ViewHome implements IViewProfileEdit {
	protected _configProfileEdit: ViewProfileEditConfig;
	protected _components: ComponentsProfileEdit = {};

	constructor(config: ViewProfileEditConfig, root: Root) {
		super(config, root);
		this._configProfileEdit = config;
	}

	handleChange(change: ChangeProfileEdit): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_PROFILE_EDIT_TYPES.requestFail:
				this.updateViewProfileEdit(change.data);
				break;
			case ACTION_PROFILE_EDIT_TYPES.requestSuccess:
				this.sendAction(
					new ActionMenuLinkClick({ href: this._profileLinkHref }),
				);
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
		super._render();
		this._renderProfileEditForm();
		this._addHandlers();
	}

	protected _renderProfileEditForm(): void {
		const content = this.content;
		const profileEditForm = new ProfileEditForm(
			this._configProfileEdit.profileEditForm,
			content,
		);
		profileEditForm.render();
		this._components.profileEditForm = profileEditForm;
	}

	private get _profileEditForm(): ProfileEditForm {
		const form = this._components.profileEditForm;
		if (!form) {
			throw new Error('profileEditForm not found');
		}
		return form;
	}

	private _addHandlers() {
		const form = this._profileEditForm;
		form.addHandler(form.htmlElement, 'submit', (event) => {
			event.preventDefault();
			const validator = new Validator();
			const formData = validator.validateForm(this._profileEditForm.formData, this._profileEditForm.form);
			if (formData) {
				api.editProfile(formData);
			}
		});
	}


	private _addHandlerInput(): void {
		const fileInput = this._profileEditForm.fileInput;
		const label = this._profileEditForm.label;
		const preview = this._profileEditForm.img as HTMLImageElement;
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

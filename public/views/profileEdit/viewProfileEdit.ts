import { ACTION_PROFILE_EDIT_TYPES } from '../../actions/actionProfileEdit';
import { Root } from '../../components';
import {
	ProfileEditForm,
	IProfileEditFormConfig,
} from '../../components/ProfileEditForm/ProfileEditForm';
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
		this._configProfileEdit = Object.assign(
			this._configProfileEdit,
			change.data,
		);
		switch (change.type) {
			case ACTION_PROFILE_EDIT_TYPES.goToProfileEdit:
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

	private _addHandlers() {
		this.content.addHandler(
			document.querySelector('.form__upload') as HTMLElement,
			'click',
			() => {
				if (document.getElementById('file')) {
					document.getElementById('file')?.click();
				}
			}
		);
	}
}

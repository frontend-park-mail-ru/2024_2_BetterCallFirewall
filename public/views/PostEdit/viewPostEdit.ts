import { ACTION_POST_EDIT_TYPES } from '../../actions/actionPostEdit';
import { Root } from '../../components';
import { IPostEditFormConfig, PostEditForm } from '../../components/PostEditForm/PostEditForm';
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
		this._configPostEdit = Object.assign(
			this._configPostEdit,
			change.data,
		);
		switch (change.type) {
			case ACTION_POST_EDIT_TYPES.goToPostEdit:
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
		this._renderProfileEditForm();
	}

	protected _renderProfileEditForm(): void {
		const content = this.content;
		const profileEditForm = new PostEditForm(
			this._configPostEdit.postEditForm,
			content,
		);
		profileEditForm.render();
		this._components.profileEditForm = profileEditForm;
	}
}

import { ActionMenuLinkClick } from '../../actions/actionMenu';
import { ACTION_POST_EDIT_TYPES } from '../../actions/actionPostEdit';
import api from '../../api/api';
import { Root } from '../../components';
import {
	IPostEditFormConfig,
	PostEditForm,
} from '../../components/PostEditForm/PostEditForm';
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
			'click',
			(event) => {
				event.preventDefault();
				const formData = this._postEditForm.formData;
				api.editPost(formData, this._configPostEdit.postId);
			},
		);
	}
}

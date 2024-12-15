import { ActionAppGoTo } from '../../actions/actionApp';
import { ACTION_POST_EDIT_TYPES } from '../../actions/actionPostEdit';
import api from '../../api/api';
import app from '../../app';
import { Root } from '../../components';
import {
	PostEditFormConfig,
	PostEditForm,
} from '../../components/PostEditForm/PostEditForm';
import { PAGE_URLS } from '../../config';
import { PostPayload } from '../../models/post';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
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
			case ACTION_POST_EDIT_TYPES.requestSuccess: {
				const url = new URL(app.router.href);
				const groupId = url.searchParams.get('community');
				if (groupId) {
					this.sendAction(
						new ActionAppGoTo(PAGE_URLS.groupPage + `/${groupId}`),
					);
				} else {
					this.sendAction(new ActionAppGoTo(this._profileLinkHref));
				}
				break;
			}
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
			default:
				this.updateViewProfileEdit(change.data);
		}
	}

	render(): void {
		this._render();
	}

	updateViewProfileEdit(data: ViewPostEditConfig): void {
		this.updateViewHome(data);
		this._configPostEdit = Object.assign(this._configPostEdit, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderPostEditForm();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderPostEditForm(): void {
		this._components.postEditForm = new PostEditForm(
			this._configPostEdit.postEditForm,
			this.content,
		);
	}

	protected _addHandlers() {
		super._addHandlers();
		this._postEditForm.vnode.handlers.push({
			event: 'submit',
			callback: async (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._postEditForm.formData,
					this._postEditForm.form,
				);
				if (formData) {
					const files =
						this._configPostEdit.postEditForm.attachmentsInput
							.files;
					if (formData.get('text') || files.length) {
						const filesStr = files.map((file) => file.src);
						const emptyFiles = filesStr.filter((file) => {
							if (!file) {
								return file;
							}
						});
						if (emptyFiles.length) {
							this._postEditForm.printError(
								'Что-то пошло не так',
							);
							return;
						}
						const postPayload: PostPayload = {
							post_content: {
								text: formData.get('text') as string,
								file: filesStr,
							},
						};
						const url = new URL(app.router.href);
						api.editPost(
							postPayload,
							this._configPostEdit.postId,
							url.search,
						);
					} else {
						this._postEditForm.printError(
							'Пост не должен быть пустым',
						);
					}
				}
			},
		});
	}

	private get _postEditForm(): PostEditForm {
		const form = this._components.postEditForm;
		if (!form) {
			throw new Error('postEditForm not found');
		}
		return form;
	}
}

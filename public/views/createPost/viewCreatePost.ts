import { ActionAppGoTo } from '../../actions/actionApp';
import { ActionUpdateCreatePost } from '../../actions/actionCreatePost';
import { ACTION_FEED_TYPES } from '../../actions/actionFeed';
import api from '../../api/api';
import app from '../../app';
import { Root } from '../../components';
import {
	CreatePostForm,
	CreatePostFormConfig,
} from '../../components/CreatePostForm/CreatePostForm';
import { PAGE_URLS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import { PostPayload } from '../../models/post';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeCreatePost } from '../../stores/storeCreatePost';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsCreatePost = {
	createPostForm?: CreatePostForm;
} & ComponentsHome;

export interface ViewCreatePostConfig extends HomeConfig {
	createPostForm: CreatePostFormConfig;
}

export class ViewCreatePost extends ViewHome {
	protected _configCreatePost: ViewCreatePostConfig;
	protected _components: ComponentsCreatePost = {};

	constructor(config: ViewCreatePostConfig, root: Root) {
		super(config, root);
		this._configCreatePost = config;
	}

	get config(): ViewCreatePostConfig {
		return this._configCreatePost;
	}

	handleChange(change: ChangeCreatePost): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_FEED_TYPES.postCreateSuccess:
				this.sendAction(new ActionAppGoTo(this._profileLinkHref));
				break;
			case ACTION_FEED_TYPES.postGroupCreateSuccess: {
				const url = new URL(app.router.href);
				const groupId = url.searchParams.get('community');
				if (groupId) {
					this.sendAction(
						new ActionAppGoTo(PAGE_URLS.groupPage + `/${groupId}`),
					);
				}
				break;
			}
			default:
				this.updateViewCreatePost(change.data);
		}
	}

	render(): void {
		this._render();
		dispatcher.getAction(
			new ActionUpdateCreatePost(this._configCreatePost.createPostForm),
		);
	}

	updateViewCreatePost(data: ViewCreatePostConfig): void {
		this.updateViewHome(data);
		this._configCreatePost = Object.assign(this._configCreatePost, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderCreatePostForm();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderCreatePostForm(): void {
		this._components.createPostForm = new CreatePostForm(
			this._configCreatePost.createPostForm,
			this.content,
		);
	}

	protected _addHandlers() {
		super._addHandlers();

		this._createPostForm.vnode.handlers.push({
			event: 'submit',
			callback: async (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._createPostForm.formData,
					this._createPostForm.form,
				);
				if (formData) {
					const files =
						this._configCreatePost.createPostForm.attachmentsInput
							.files;
					if (formData.get('text') || files.length) {
						const filesStr = files.map((file) => file.src);
						const emptyFiles = filesStr.filter((file) => {
							if (!file) {
								return file;
							}
						});
						if (emptyFiles.length) {
							this._createPostForm.printError(
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
						api.createPost(postPayload, url.search);
						this._createPostForm.clearError();
					} else {
						this._createPostForm.printError(
							'Пост не должен быть пустым',
						);
					}
				}
			},
		});
	}

	private get _createPostForm(): CreatePostForm {
		const form = this._components.createPostForm;
		if (!form) {
			throw new Error('form not found');
		}
		return form;
	}
}

import {
	ACTION_GROUP_PAGE_TYPES,
	ActionGroupPageDeleteGroup,
	ActionGroupPagePostsRequest,
	ActionGroupPageRequest,
	ActionUpdateGroupPage,
} from '../../actions/actionGroupPage';
import { ActionAppGoTo } from '../../actions/actionApp';
import api from '../../api/api';
import app from '../../app';
import { Post, Root } from '../../components';
import {
	GroupPage,
	GroupPageConfig,
} from '../../components/GroupPage/GroupPage';
import { update } from '../../modules/vdom';
import { ChangeGroupPage } from '../../stores/storeGroupPage';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';
import { PAGE_LINKS, PAGE_URLS, ROOT } from '../../config';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';

export type ComponentsGroupPage = {
	groupPage?: GroupPage;
} & ComponentsHome;

export interface ViewGroupPageConfig extends HomeConfig {
	groupPage: GroupPageConfig;
	path: string;
}

export class ViewGroupPage extends ViewHome {
	protected _configGroupPage: ViewGroupPageConfig;
	protected _components: ComponentsGroupPage = {};

	constructor(config: ViewGroupPageConfig, root: Root) {
		super(config, root);
		this._configGroupPage = config;
	}

	get config(): ViewGroupPageConfig {
		return this._configGroupPage;
	}

	get groupPage(): GroupPage {
		const groupPage = this._components.groupPage;
		if (!groupPage) {
			throw new Error('groupPage on ViewGroupPage does not exist');
		}
		return groupPage;
	}

	handleChange(change: ChangeGroupPage): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_GROUP_PAGE_TYPES.deleteGroupSuccess:
				this.sendAction(new ActionAppGoTo(PAGE_LINKS.groups));
				break;
			case ACTION_GROUP_PAGE_TYPES.groupPageRequestSuccess:
				this.updateViewGroupPage(change.data);
				this.sendAction(
					new ActionGroupPagePostsRequest(
						this._configGroupPage.groupPage.id,
					),
				);
				break;
			default:
				this.updateViewGroupPage(change.data);
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionUpdateGroupPage());
		this.sendAction(new ActionGroupPageRequest(app.router.path));
	}

	updateViewGroupPage(data: ViewGroupPageConfig): void {
		super.updateViewHome(data);
		this._configGroupPage = Object.assign(this._configGroupPage, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderGroupPage();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderGroupPage(): void {
		this._components.groupPage = new GroupPage(
			this._configGroupPage.groupPage,
			this.content,
		);
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this._addGroupPageHandlers();
	}

	private _addGroupPageHandlers() {
		if (this.groupPage.config.isAdmin) {
			this.groupPage.createPostLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(this.groupPage.config.createPostHref),
					);
				},
			});
			this.groupPage.groupEditButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(
							PAGE_URLS.groupEdit +
								`/${this._configGroupPage.groupPage.id}`,
						),
					);
				},
			});
			this.groupPage.deleteGroupButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionGroupPageDeleteGroup(this.groupPage.id),
					);
				},
			});
		}
		this.groupPage.posts.forEach((post) => this._addPostHandlers(post));
	}

	private _addPostHandlers(post: Post) {
		if (post.config.hasEditButton) {
			post.editButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					const url = new URL(PAGE_URLS.postEdit, ROOT);
					url.searchParams.append(
						'community',
						`${this._configGroupPage.groupPage.id}`,
					);
					this.sendAction(
						new ActionAppGoTo(url.pathname + url.search),
					);
					this.sendAction(new ActionPostEditGoTo(post.config));
				},
			});
		}
		if (post.config.hasDeleteButton) {
			post.deleteButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					api.deletePost(post.config.id);
				},
			});
		}
	}
} //

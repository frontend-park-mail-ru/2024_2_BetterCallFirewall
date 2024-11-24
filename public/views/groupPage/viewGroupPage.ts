import { ActionCreatePostGoTo } from '../../actions/actionCreatePost';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';
import api from '../../api/api';
import { Post, Root } from '../../components';
import {
	GroupPage,
	GroupPageConfig,
} from '../../components/GroupPage/GroupPage';
import { update } from '../../modules/vdom';
import { ChangeGroupPage } from '../../stores/storeGroupPage';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

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
			throw new Error('profile on ViewGroupPage does not exist');
		}
		return groupPage;
	}

	handleChange(change: ChangeGroupPage): void { //
		super.handleChange(change);
		switch (change.type) {
			default:
				this.updateViewGroupPage(change.data);
		}
	} //

	render(): void {
		this._render();
		// this.sendAction(new ActionUpdateProfile());
		// this.sendAction(new ActionProfileRequest(app.router.path));
		// this._components.groupPage?.posts.forEach((post) => {
		// 	this.sendAction(new ActionPostLikeCount(post.config.id));
		// });
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
		const exampleGroups: GroupPageConfig = {
			key: 'groups',
			id: 1,
			name: 'Рифмы и панчи',
			description: 'Про рифмы и панчи',
			img: './img',
			posts: [],
			createPostHref: './create--post',
			isAdmin: true,
		};
		this._components.groupPage = new GroupPage(exampleGroups, this.content);
	}

	protected _addHandlers(): void { //
		super._addHandlers();
		this._addGroupPageHandlers();
	}

	private _addGroupPageHandlers() {
		if (this.groupPage.config.isAdmin) {
			this.groupPage.createPostLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionCreatePostGoTo());
				},
			});
		};
		this.groupPage.posts.forEach((post) => this._addPostHandlers(post));
	}

	private _addPostHandlers(post: Post) {
		if (post.config.hasEditButton) {
			post.editButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
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

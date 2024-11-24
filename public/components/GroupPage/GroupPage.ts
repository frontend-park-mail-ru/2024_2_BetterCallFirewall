import {
	findVNodeByKey,
	VNode,
} from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import { PostConfig, Post } from '../Post/Post';

type Posts = Post[];

export interface GroupPageConfig extends ComponentConfig {
	id: number;
	name?: string;
	description?: string;
	img: string;
	posts: PostConfig[];
	createPostHref: string;
	isAdmin: boolean;
	isFollow: boolean;
}

export class GroupPage extends Component {
	protected override _config: GroupPageConfig;
	private _posts: Posts = [];

	constructor(config: GroupPageConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): GroupPageConfig {
		if (this._config) {
			return this._config;
		}
		throw new Error('config not found');
	}

	set config(config: GroupPageConfig) {
		this._config = config;
	}

	get createPostLinkVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, 'createPost');
		if (!vnode) {
			throw new Error('createPostLink vnode not found');
		}
		return vnode;
	}

    get deleteGroupButtonVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, 'deleteGroup');
		if (!vnode) {
			throw new Error('deleteButton vnode not found');
		}
		return vnode;
	}

	get posts(): Post[] {
		return this._posts;
	}

	render(): string {
		this._prerender();
		return this._render('GroupPage.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._posts = this._config.posts.map((config) => {
			return new Post(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			posts: this._posts.map((post) => {
				return post.render();
			}),
		};
	}
}

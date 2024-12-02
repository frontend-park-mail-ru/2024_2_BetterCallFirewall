import {
	findVNodeByClass,
	findVNodeByClassAll,
	findVNodeByKey,
	VNode,
} from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import { PostConfig, Post } from '../Post/Post';

type Posts = Post[];

export interface ProfileConfig extends ComponentConfig {
	id: number;
	firstName?: string;
	secondName?: string;
	description?: string;
	friendsCount?: number;
	groupsCount?: number;
	img: string;
	currentUser?: boolean;
	posts: PostConfig[];
	createPostHref: string;
	editProfileHref: string;
	isAuthor: boolean;
	isFriend: boolean;
	isSubscriber: boolean;
	isSubscription: boolean;
	isUnknown: boolean;
}

export class Profile extends Component {
	protected override _config: ProfileConfig;
	private _posts: Posts = [];

	constructor(config: ProfileConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): ProfileConfig {
		if (this._config) {
			return this._config;
		}
		throw new Error('config not found');
	}

	set config(config: ProfileConfig) {
		this._config = config;
	}

	get createPostLinkVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, 'createPost');
		if (!vnode) {
			throw new Error('createPostLink vnode not found');
		}
		return vnode;
	}

	get profileEditLinkVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, 'profileEdit');
		if (!vnode) {
			throw new Error('profileEditLink vnode not found');
		}
		return vnode;
	}

	get writeMessageLinkVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, 'writeMessage');
		if (!vnode) {
			throw new Error('writeMessageLink vnode not found');
		}
		return vnode;
	}

	get acceptFriendButtonVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'accept-friend');
		if (!vnode) {
			throw new Error('acceptFriendButton vnode not found');
		}
		return vnode;
	}

	get unsubscribeButtonVNode(): VNode {
		return this._findVNodeByClass('unsubscribe-friend');
	}

	get postsVNodes(): VNode[] {
		const vnode = findVNodeByClassAll(this.vnode, 'accept-friend');
		if (!vnode) {
			throw new Error('acceptFriendButton vnode not found');
		}
		return vnode;
	}

	get posts(): Post[] {
		return this._posts;
	}

	render(): string {
		this._prerender();
		return this._render('Profile.hbs');
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

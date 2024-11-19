// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';
// import { PostConfig, Post } from '../Post/Post';

// type Posts = Post[];

// export interface IProfileConfig extends IBaseComponentConfig {
// 	id: number;
// 	firstName?: string;
// 	secondName?: string;
// 	description?: string;
// 	friendsCount?: number;
// 	groupsCount?: number;
// 	img: string;
// 	currentUser?: boolean;
// 	posts?: PostConfig[];
// 	createPostHref: string;
// 	isAuthor: boolean;
// 	isFriend: boolean;
// 	isSubscriber: boolean;
// 	isSubscription: boolean;
// }

// export class Profile extends BaseComponent {
// 	protected override _config: IProfileConfig | null;
// 	private _posts: Posts = [];

// 	constructor(config: IProfileConfig, parent: IBaseComponent) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	get config(): IProfileConfig {
// 		if (this._config) {
// 			return this._config;
// 		}
// 		throw new Error('config not found');
// 	}

// 	set config(config: IProfileConfig) {
// 		this._config = config;
// 	}

// 	get postsContainer(): HTMLElement {
// 		const container = this.htmlElement.querySelector(
// 			'div.profile__posts',
// 		) as HTMLElement;
// 		if (!container) {
// 			throw new Error('.profile__posts not found');
// 		}
// 		return container;
// 	}

// 	get createPostLink(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'a.header__link',
// 		) as HTMLElement;
// 		if (!html) {
// 			throw new Error('createPostLink not found');
// 		}
// 		return html;
// 	}

// 	get profileEditLink(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'a.profile-edit',
// 		) as HTMLElement;
// 		if (!html) {
// 			throw new Error('profileEditLink not found');
// 		}
// 		return html;
// 	}

// 	get writeMessageLink(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'.write-message',
// 		) as HTMLElement;
// 		if (!html) {
// 			throw new Error('writeMessageLink not found');
// 		}
// 		return html;
// 	}

// 	get acceptFriendButton(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'.accept-friend',
// 		) as HTMLElement;
// 		if (!html) {
// 			throw new Error('acceptFriendButton not found');
// 		}
// 		return html;
// 	}

// 	get posts(): Post[] {
// 		return this._posts;
// 	}

// 	render(show: boolean = true): string {
// 		this._prerender();
// 		this._render('Profile.hbs', show);

// 		// const postsItems = this._htmlElement?.querySelector(
// 		// 	'.profile__posts',
// 		// ) as HTMLElement;
// 		// if (postsItems) {
// 		// 	this.config.posts?.forEach((config) => {
// 		// 		const post = new Post(config, this);
// 		// 		this._posts.push(post);
// 		// 		post.render(false);
// 		// 		post.appendToHTML(postsItems);
// 		// 	});
// 		// } else {
// 		// 	throw new Error('profile has no .profile__posts');
// 		// }

// 		return this.htmlElement.outerHTML;
// 	}

// 	remove(): void {
// 		super.remove();
// 		this._posts = [];
// 	}

// 	removeForUpdate(): void {
// 		super.removeForUpdate();
// 		this._posts = [];
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = {
// 			...this._config,
// 		};
// 	}
// }

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
	isAuthor: boolean;
	isFriend: boolean;
	isSubscriber: boolean;
	isSubscription: boolean;
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

	// get postsContainer(): HTMLElement {
	// 	const container = this.htmlElement.querySelector(
	// 		'div.profile__posts',
	// 	) as HTMLElement;
	// 	if (!container) {
	// 		throw new Error('.profile__posts not found');
	// 	}
	// 	return container;
	// }

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
		this._templateContext = {
			...this._templateContext,
			posts: this._config.posts.map((postConfig) => {
				const post = new Post(postConfig, this);
				return post.render();
			}),
		};
	}
}

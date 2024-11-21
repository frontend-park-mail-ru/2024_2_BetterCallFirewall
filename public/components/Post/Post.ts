import { findVNodeByClass, VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';

export interface PostConfig extends ComponentConfig {
	id: number;
	key: string;
	avatar: string;
	title: string;
	text: string;
	img?: string;
	date: string;
	hasDeleteButton: boolean;
	hasEditButton: boolean;
	likes: number;
	likedByUser: boolean;
}

/**
 * Class of post
 */
export class Post extends Component {
	protected _config: PostConfig;

	/**
	 * Instance of post
	 *
	 * @param {PostConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: PostConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): PostConfig {
		return this._config;
	}

	get editButtonVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'post__header-edit');
		if (!vnode) {
			throw new Error('editButton vnode not found');
		}
		return vnode;
	}

	get deleteButtonVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'post__header-delete');
		if (!vnode) {
			throw new Error('deleteButton vnode not found');
		}
		return vnode;
	}

	get likeButtonVNode(): VNode {
		return this._findVNodeByClass('post__like-button');
	}

	render(): string {
		this._prerender();
		return this._render('Post.hbs');
	}
}

import { VNode } from '../../modules/vdom';
import { Component, ComponentConfig } from '../Component';

export interface GroupConfig extends ComponentConfig {
	id: number;
	avatar: string;
	description: string;
	name: string;
	isFollow: boolean;
	href: string;
}

export class Group extends Component {
	protected _config: GroupConfig;
	/**
	 * Instance of group
	 *
	 * @param {GroupConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: GroupConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): GroupConfig {
		return this._config;
	}

	get id(): number {
		return this._config.id;
	}

	render(): string {
		this._prerender();
		return this._render('Group.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
		};
	}

	get unfollowGroupButtonVNode(): VNode {
		return this._findVNodeByClass('unfollow-group');
	}

	get followGroupButtonVNode(): VNode {
		return this._findVNodeByClass('follow-group');
	}

	get groupLinkVNode(): VNode {
		return this._findVNodeByKey('groupLink');
	}

	get groupLinkAvatarVNode(): VNode {
		return this._findVNodeByClass('group-avatar');
	}
}

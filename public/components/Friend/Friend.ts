import { VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';

export interface FriendConfig extends ComponentConfig {
	id: number;
	avatar: string;
	name: string;
	isFriend: boolean;
	isSubscriber: boolean;
	isSubscription: boolean;
}

export class Friend extends Component {
	protected _config: FriendConfig;
	protected isUnknown: boolean = false;
	/**
	 * Instance of friend
	 *
	 * @param {FriendConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: FriendConfig, parent: Component) {
		super(config, parent);
		this._config = config;
		if (
			!this._config.isFriend &&
			!this._config.isSubscriber &&
			!this._config.isSubscription
		) {
			this.isUnknown = true;
		}
	}

	get config(): FriendConfig {
		return this._config;
	}

	render(): string {
		this._prerender();
		return this._render('Friend.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
			isUnknown: this.isUnknown,
		};
	}

	get removeFriendButtonVNode(): VNode {
		return this._findVNodeByClass('remove-friend');
	}

	get acceptFriendButtonVNode(): VNode {
		return this._findVNodeByClass('accept-friend');
	}

	get unsubscribeFriendButtonVNode(): VNode {
		return this._findVNodeByClass('unsubscribe-friend');
	}

	get subscribeFriendButtonVNode(): VNode {
		return this._findVNodeByClass('subscribe-friend');
	}

	get profileLinkVNode(): VNode {
		return this._findVNodeByKey('profileLink');
	}

	get profileLinkAvatarVNode(): VNode {
		return this._findVNodeByClass('friend-avatar');
	}

	get writeMessageLinkVNode(): VNode {
		return this._findVNodeByKey('writeMessage');
	}
}

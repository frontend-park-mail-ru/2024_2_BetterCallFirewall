import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IFriendConfig extends IBaseComponentConfig {
	id: number;
	avatar: string;
	name: string;
	isFriend: boolean;
	isSubscriber: boolean;
	isSubscription: boolean;
}

export interface IFriend extends BaseComponent {}

export class Friend extends BaseComponent implements IFriend {
	protected _config: IFriendConfig;
	protected isUnknown: boolean = false;
	/**
	 * Instance of friend
	 *
	 * @param {IFriendConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IFriendConfig, parent: IBaseComponent) {
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

	get config(): IFriendConfig {
		return this._config;
	}

	render(show: boolean = true): string {
		this._prerender();
		return this._render('Friend.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this.config,
			isUnknown: this.isUnknown,
		};
	}

	get removeFriendButton(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'button.remove-friend',
		) as HTMLElement;
		if (!html) {
			throw new Error('removeFriendButton not found');
		}
		return html;
	}
	get acceptFriendButton(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'button.accept-friend',
		) as HTMLElement;
		if (!html) {
			throw new Error('acceptFriendButton not found');
		}
		return html;
	}
	get unsubscribeFriendButton(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'button.unsubscribe-friend',
		) as HTMLElement;
		if (!html) {
			throw new Error('unsubscribeFriendButton not found');
		}
		return html;
	}
	get subscribeFriendButton(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'button.subscribe-friend',
		) as HTMLElement;
		if (!html) {
			throw new Error('subscribeFriendButton not found');
		}
		return html;
	}
	get profileLink(): HTMLElement {
		const html = this.htmlElement.querySelector('.link') as HTMLElement;
		if (!html) {
			throw new Error('profileLink not found');
		}
		return html;
	}
	get writeMessageLink(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.friend__link',
		) as HTMLElement;
		if (!html) {
			throw new Error('writeMessageLink not found');
		}
		return html;
	}
}

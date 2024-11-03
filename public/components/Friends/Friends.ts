import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { Friend, IFriendConfig } from '../Friend/Friend';

export interface FriendsConfig extends IBaseComponentConfig {
	headerText: string;
	friendsConfig: IFriendConfig[];
}

export class Friends extends BaseComponent {
	protected _config: FriendsConfig;

	constructor(config: FriendsConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	render(show: boolean = true): string {
		this._prerender();
		this._render('Friends.hbs', show);
		const contentHtml = this.htmlElement.querySelector(
			'div.friends__content',
		) as HTMLElement;
		if (!contentHtml) {
			throw new Error('friends content not found');
		}
		this._config.friendsConfig.forEach((config) => {
			const friend = new Friend(config, this);
			friend.render(false);
			friend.appendToHTML(contentHtml);
		});
		return this.htmlElement.outerHTML;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}

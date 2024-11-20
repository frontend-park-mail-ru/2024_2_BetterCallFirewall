import Component, { ComponentConfig } from '../Component';

export interface MessageConfig extends ComponentConfig {
	authorId: number;
	avatar: string;
	name: string;
	lastMessage: string;
	date: string;
	unreadedCount: number;
	href: string;
}

export class Message extends Component {
	protected _config: MessageConfig;

	/**
	 * Instance of messages
	 *
	 * @param {MessageConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: MessageConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): MessageConfig {
		return this._config;
	}

	get href(): string {
		return this.config.href;
	}

	get authorId(): number {
		return this.config.authorId;
	}

	render(): string {
		this._prerender();
		return this._render('Message.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
			hasUnreadMessages: this.config.unreadedCount > 0,
		};
	}
}

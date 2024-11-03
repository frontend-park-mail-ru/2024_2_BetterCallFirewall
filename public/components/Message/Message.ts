import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IMessageConfig extends IBaseComponentConfig {
	authorId: number;
	avatar: string;
	name: string;
	lastMessage: string;
	date: string;
	unreadedCount: number;
	href: string;
}

export interface IMessages extends BaseComponent {}

export class Message extends BaseComponent implements IMessages {
	protected _config: IMessageConfig;

	/**
	 * Instance of messages
	 *
	 * @param {IMessageConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IMessageConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	get config(): IMessageConfig {
		return this._config;
	}

	get href(): string {
		return this.config.href;
	}

	render(show: boolean = true): string {
		this._prerender();
		return this._render('Message.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}

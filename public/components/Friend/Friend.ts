import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IFriendConfig extends IBaseComponentConfig {
	id: number;
	avatar: string;
	name: string;
	// description: string;
	// isFriend: boolean;
}

export interface IFriend extends BaseComponent {}

export class Friend extends BaseComponent implements IFriend {
	protected _config: IFriendConfig | null;

	/**
	 * Instance of friend
	 *
	 * @param {IFriendConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IFriendConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	render(show: boolean = true): string {
		this._prerender();
		console.log(this._config);
		return this._render('Friend.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}

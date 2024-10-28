import BaseComponent, { IBaseComponent, IBaseComponentConfig } from "../BaseComponent";

export interface IChatConfig extends IBaseComponentConfig {
    companionAvatar: string;
    companionName: string;
    lastDateOnline: string
}

export interface IChat extends BaseComponent {}

export class Chat extends BaseComponent implements IChat {
    protected _config: IChatConfig | null;

    /**
     * Instance of chat
     *
     * @param {IChatConfig} config - post data
     * @param {IBaseComponent} parent - parent element
     */
    constructor(config: IChatConfig, parent: IBaseComponent) {
        super(config, parent);
        this._config = config;
    }

    render(show: boolean = true): string {
		this._prerender();
		return this._render('Chat.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}
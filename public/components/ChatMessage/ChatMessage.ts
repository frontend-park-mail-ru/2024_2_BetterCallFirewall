import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IChatMessageConfig extends IBaseComponentConfig {
	userId: number;
    messageAvatar: string;
    messageName: string;
    messageText: string;
}

export interface IChatMessage extends BaseComponent {}

export class ChatMessage extends BaseComponent implements IChatMessage {
	protected _config: IChatMessageConfig | null;

	constructor(config: IChatMessageConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	render(show: boolean = true): string {
		this._prerender();
		return this._render('ChatMessage.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}

    show(parent: HTMLElement) {
		parent.appendChild(this.htmlElement);
	}
}

import Component, { ComponentConfig } from '../Component';

export interface ChatMessageConfig extends ComponentConfig {
	userId: number;
	messageAvatar: string;
	messageName: string;
	messageText: string;
	createdAt: string;
	createdAtISO: string;
	isAuthor: boolean;
}

export class ChatMessage extends Component {
	protected _config: ChatMessageConfig;

	constructor(config: ChatMessageConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('ChatMessage.hbs');
	}
}

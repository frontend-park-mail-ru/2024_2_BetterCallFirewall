import { filePayloadFromURL } from '../../models/file';
import { Attachment } from '../Attachment/Attachment';
import { Component, ComponentConfig } from '../Component';

export interface ChatMessageConfig extends ComponentConfig {
	userId: number;
	messageAvatar: string;
	messageName: string;
	messageText: string;
	createdAt: string;
	createdAtISO: string;
	isAuthor: boolean;
	files: string[];
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

	protected _prerender(): void {
		super._prerender();
		const attachments = this._config.files.map((file, i) => {
			return new Attachment(
				{
					key: `attachment-${i}`,
					file: filePayloadFromURL(file),
					hasDeleteButton: false,
				},
				this,
			).render();
		});
		this._templateContext = { ...this._templateContext, attachments };
	}
}

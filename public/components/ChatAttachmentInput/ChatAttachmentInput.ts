import {
	BaseAttachmentInput,
	BaseAttachmentInputConfig,
} from '../BaseAttachmentInput/BaseAttachmentInput';
import Component from '../Component';

export interface ChatAttachmentInputConfig extends BaseAttachmentInputConfig {}

export class ChatAttachmentInput extends BaseAttachmentInput {
	protected _config: ChatAttachmentInputConfig;

	constructor(config: ChatAttachmentInputConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('ChatAttachmentInput.hbs');
	}
}

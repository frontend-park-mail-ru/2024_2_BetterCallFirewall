import {
	BaseAttachmentInput,
	BaseAttachmentInputConfig,
} from '../BaseAttachmentInput/BaseAttachmentInput';
import Component from '../Component';

export interface AttachmentsInputConfig extends BaseAttachmentInputConfig {}

export class AttachmentsInput extends BaseAttachmentInput {
	protected _config: AttachmentsInputConfig;

	constructor(config: AttachmentsInputConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('AttachmentsInput.hbs');
	}
}

import { VNode } from '../../modules/vdom';
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

	get errorFieldVNode(): VNode {
		return this._findVNodeByClass('form__input-error');
	}

	printError(error: string): void {
		this.errorFieldVNode.element.textContent = error;
	}

	render(): string {
		this._prerender();
		return this._render('AttachmentsInput.hbs');
	}
}

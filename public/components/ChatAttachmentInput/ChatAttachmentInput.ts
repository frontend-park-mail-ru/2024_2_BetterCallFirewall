import { VNode } from '../../modules/vdom';
import {
	BaseAttachmentInput,
	BaseAttachmentInputConfig,
} from '../BaseAttachmentInput/BaseAttachmentInput';
import { Component } from '../Component';

export interface ChatAttachmentInputConfig extends BaseAttachmentInputConfig {}

export class ChatAttachmentInput extends BaseAttachmentInput {
	protected _config: ChatAttachmentInputConfig;

	constructor(config: ChatAttachmentInputConfig, parent: Component) {
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
		return this._render('ChatAttachmentInput.hbs');
	}
}

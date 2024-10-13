import { IBaseComponent } from '../BaseComponent.ts';
import {
	Container,
	IContainer,
	IContainerConfig,
	ContentMessage,
	IContentMessage,
} from '../index.ts';

export interface IContentConfig extends IContainerConfig {}

export interface IContent extends IContainer {
	printMessage(message: string): void;
	removeMessage(): void;
}

export class Content extends Container implements IContent {
	private message: IContentMessage | null;

	/**
	 * Создает новый компонент Content
	 * @param {IContentConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IContentConfig, parent: IBaseComponent) {
		super(config, parent);
		this.message = null;
	}

	/**
	 * Prints message at the end of content
	 * @param {string} message
	 */
	printMessage(message: string) {
		if (this.message) {
			return;
		}
		const messageItem = new ContentMessage(
			{ key: 'message', text: message },
			this,
		);
		messageItem.render();
		this.message = messageItem;
	}

	/**
	 * Removes message
	 */
	removeMessage() {
		if (this.message) {
			this.message.remove();
			this.message = null;
		}
	}
}

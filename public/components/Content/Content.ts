import { IBaseComponent } from '../BaseComponent';
import {
	Container,
	IContainerConfig,
	ContentMessage,
	IContentMessage,
} from '../index';

export interface IContentConfig extends IContainerConfig {}

export interface IContent extends Container {
	printMessage(message: string): void;
	removeMessage(): void;
	removeInner(): void;
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
		console.log('Content: printMessage:', message);
		if (this.message) {
			this.removeMessage();
			this.message = null;
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

	update(data: IContentConfig): void {
		this._config = data;
	}

	removeInner() {
		this.removeHandlers();
		Object.entries(this.children).forEach(([, child]) => {
			child.remove();
		});
	}
}

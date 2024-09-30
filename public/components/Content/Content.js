import Container from '../Container/Container.js';
import ContentMessage from '../ContentMessage/ContentMessage.js';

export default class Content extends Container {
	#message;
	/**
	 * Prints message at the end of content
	 * @param {string} message
	 */
	printMessage(message) {
		if (this.#message) {
			return;
		}
		const messageItem = new ContentMessage(
			{ section: 'message', text: message },
			this.htmlElement,
		);
		messageItem.render();
		this.#message = messageItem;
	}

	/**
	 * Removes message
	 */
	removeMessage() {
		if (this.#message) {
			this.#message.remove();
		}
	}
}

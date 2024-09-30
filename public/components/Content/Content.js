import Container from '../Container/Container.js';
import ContentMessage from '../ContentMessage/ContentMessage.js';

export default class Content extends Container {
	#message;
	/**
	 * Prints message at the end of content
	 * @param {string} message
	 */
	printMessage(message) {
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
		this.#message.remove();
	}
}

export default class Post {
	#data;
	#parent;
	/**
	 *
	 * @param {Object} data
	 * @param {HTMLElement} parent
	 */
	constructor(data, parent) {
		this.#data = data;
		this.#parent = parent;
	}
	render() {
		const template = Handlebars.templates['Post.hbs'];
		const html = template(this.#data);
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
}

/**
 * Class of post
 */
export default class Post {
	#data;
	#parent;
	/**
	 * Instance of post
	 *
	 * @param {Object} data - post data
	 * @param {HTMLElement} parent - parent element
	 */
	constructor(data, parent) {
		this.#data = data;
		this.#parent = parent;
	}
	/**
	 * Post rendering with handlebars
	 * 
	 * @returns {string} - generated HTML code
	 */
	render() {
		const template = Handlebars.templates['Post.hbs'];
		const html = template(this.#data);
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
}

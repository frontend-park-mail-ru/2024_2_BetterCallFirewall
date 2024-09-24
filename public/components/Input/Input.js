export default class Input {
    #config;
    #parent;

    constructor(config, parent) {
        this.#config = config;
        this.#parent = parent;
        this.#config['className'] = 'input';
    }

    // set parent(parent) {
	// 	this.#parent = parent;
	// }

    render() {
        const template = Handlebars.templates['Input.hbs'];
        const html = template(this.#config);
        if (this.#parent) {
            this.#parent.innerHTML += html;
        }
        return html;
    }
}
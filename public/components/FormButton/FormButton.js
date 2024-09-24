export default class FormButton {
    // #config;
    #text;
    #className;
    constructor(text) {
		// this.#config = config;
        this.#text = text;
		this.#className = 'form-button';
	}

    render() {
        const template = Handlebars.templates['FormButton.hbs'];
        const html = template({
            text: this.#text,
            className: this.#className,
        });
        return html;
    }
}
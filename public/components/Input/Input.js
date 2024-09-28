export default class Input {
    #config;
    #parent;

    constructor(config, parent) {
        this.#config = config;
        this.#parent = parent;
        this.#config['className'] = 'input-block';
    }

    render() {
        const template = Handlebars.templates['Input.hbs'];
        const html = template(this.#config);
        return html;
    }
}
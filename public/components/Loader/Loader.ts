import { Component, ComponentConfig } from '../Component';

export class Loader extends Component {
	constructor(config: ComponentConfig, parent: Component) {
		super(config, parent);
	}

	render(): string {
		this._prerender();
		return this._render('Loader.hbs');
	}
}

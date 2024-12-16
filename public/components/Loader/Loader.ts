import { Component, ComponentConfig } from '../Component';

export interface LoaderConfig extends ComponentConfig {}

export class Loader extends Component {
	constructor(config: LoaderConfig, parent: Component) {
		super(config, parent);
	}

	render(): string {
		this._prerender();
		return this._render('Loader.hbs');
	}
}

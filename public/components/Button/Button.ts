import { Component, ComponentConfig } from '../Component';

export interface ButtonConfig extends ComponentConfig {
	text: string;
	className: string;
}

export class Button extends Component {
	protected _config: ButtonConfig;

	constructor(config: ButtonConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Button.hbs');
	}
}

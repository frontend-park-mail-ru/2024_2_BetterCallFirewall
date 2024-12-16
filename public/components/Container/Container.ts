import { Component, ComponentConfig } from '../Component';

export interface ContainerConfig extends ComponentConfig {
	className: string;
}

/**
 * class of Container
 */
export class Container extends Component {
	/**
	 * Instance of Container
	 *
	 * @param {ContainerConfig} config
	 * @param {Component} parent
	 */
	constructor(config: ContainerConfig, parent: Component) {
		super(config, parent);
	}

	/**
	 * Rendering Container with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('Container.hbs');
	}
}

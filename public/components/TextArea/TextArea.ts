import { Component, ComponentConfig } from '../Component';

export interface TextAreaConfig extends ComponentConfig {
	name: string;
	header: string;
	text: string;
	type: string;
	validator?: (name: HTMLTextAreaElement) => string;
}

/**
 * Class of textarea
 */
export class TextArea extends Component {
	protected override _config: TextAreaConfig;

	constructor(config: TextAreaConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		const result = this._render('TextArea.hbs');
		return result;
	}
}

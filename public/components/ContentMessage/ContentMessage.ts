import Component, { ComponentConfig } from '../Component';

export interface ContentMessageConfig extends ComponentConfig {
	text: string;
}

export class ContentMessage extends Component {
	/**
	 * Creates instance of ContentMessage
	 * @param {ContentMessageConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: ContentMessageConfig, parent: Component) {
		super(config, parent);
	}

	/**
	 * Renders message
	 * @returns {string} - HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('ContentMessage.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this._templateContext, ...this._config };
	}
}

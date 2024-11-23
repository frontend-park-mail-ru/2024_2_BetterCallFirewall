import Component, { ComponentConfig } from '../Component';

export interface CSATConfig extends ComponentConfig {}

export class CSAT extends Component {
	protected _config: CSATConfig;
	constructor(config: CSATConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('CSAT.hbs');
	}
}

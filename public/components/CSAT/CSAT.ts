import Component, { ComponentConfig } from '../Component';

export interface CSATConfig extends ComponentConfig {
	src: string;
	show: boolean;
}

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

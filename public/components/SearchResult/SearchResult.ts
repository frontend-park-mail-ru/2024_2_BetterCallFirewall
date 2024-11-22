import Component, { ComponentConfig } from '../Component';

export interface SearchResultConfig extends ComponentConfig {
	avatar: string;
	name: string;
	description: string;
}

export class SearchResult extends Component {
	protected _config: SearchResultConfig;

	constructor(config: SearchResultConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('SearchResult.hbs');
	}
}

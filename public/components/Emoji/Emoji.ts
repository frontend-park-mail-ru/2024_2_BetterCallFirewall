import Component, { ComponentConfig } from '../Component';

export interface EmojiConfig extends ComponentConfig {}

export class Emoji extends Component {
	protected _config: EmojiConfig;

	constructor(config: EmojiConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): EmojiConfig {
		return this._config;
	}

	render(): string {
		this._prerender();
		return this._render('Emoji.hbs');
	}
}

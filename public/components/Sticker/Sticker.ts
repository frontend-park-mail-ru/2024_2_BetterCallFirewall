import { Component, ComponentConfig } from '../Component';

export interface StickerConfig extends ComponentConfig {
	file: string;
	clickable: boolean;
}

export class Sticker extends Component {
	protected _config: StickerConfig;

	constructor(config: StickerConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): StickerConfig {
		return this._config;
	}

	render(): string {
		this._prerender();
		return this._render('Sticker.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
		};
	}
}

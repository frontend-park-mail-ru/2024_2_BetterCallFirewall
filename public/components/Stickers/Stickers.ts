import Component, { ComponentConfig } from '../Component';
import { Sticker, StickerConfig } from '../Sticker/Sticker';

export interface StickersConfig extends ComponentConfig {
	headerText: string;
	stickersConfig: StickerConfig[];
}

export class Stickers extends Component {
	protected _config: StickersConfig;
	private _stickers: Sticker[] = [];

	constructor(config: StickersConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Stickers.hbs');
	}

	get listStickers(): Sticker[] {
		return this._stickers;
	}

	protected _prerender(): void {
		super._prerender();
		this._stickers = this._config.stickersConfig.map((config) => {
			return new Sticker(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			stickers: this._stickers.map((sticker) => {
				return sticker.render();
			}),
		};
	}
}
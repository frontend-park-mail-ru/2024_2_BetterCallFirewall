import { VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import { CreateStickerForm, ICreateStickerFormConfig } from '../CreateStickerForm/CreateStickerForm';
import { Sticker, StickerConfig } from '../Sticker/Sticker';

export interface StickersConfig extends ComponentConfig {
	headerText: string;
	stickersConfig: StickerConfig[];
	stickerCreateForm: ICreateStickerFormConfig;
}

export class Stickers extends Component {
	protected _config: StickersConfig;
	private _stickerCreateForm: CreateStickerForm;
	private _stickers: Sticker[] = [];

	constructor(config: StickersConfig, parent: Component) {
		super(config, parent);
		this._config = config;
		this._stickerCreateForm = new CreateStickerForm(this._config.stickerCreateForm, this);
	}

	render(): string {
		this._prerender();
		return this._render('Stickers.hbs');
	}

	get listStickers(): Sticker[] {
		return this._stickers;
	}

	get stickerCreateForm(): CreateStickerForm {
		return this._stickerCreateForm;
	}

	// get stickerCreateFormVNode(): VNode {
	// 	return this._findVNodeByKey();
	// }

	get fileInputVNode(): VNode {
		return this._findVNodeByKey('LABEL-form__upload-1');
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
			stickerCreateForm: this._stickerCreateForm.render(),
		};
	}
}

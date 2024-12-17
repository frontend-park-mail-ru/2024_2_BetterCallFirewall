import {
	ACTION_STICKERS_TYPES,
	ActionStickersGet,
} from '../../actions/actionStickers';
import api from '../../api/api';
import { Root } from '../../components';
import { Stickers, StickersConfig } from '../../components/Stickers/Stickers';
import { StickerPayload } from '../../models/sticker';
import fileToString from '../../modules/fileToString';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeStickers } from '../../stores/storeStickers';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsStickers = {
	stickers?: Stickers;
} & ComponentsHome;

export interface ViewStickersConfig extends HomeConfig {
	stickers: StickersConfig;
}

export class ViewStickers extends ViewHome {
	protected _configStickers: ViewStickersConfig;
	protected _components: ComponentsStickers = {};

	constructor(config: ViewStickersConfig, root: Root) {
		super(config, root);
		this._configStickers = config;
	}

	get config(): ViewStickersConfig {
		return this._configStickers;
	}

	protected get stickers(): Stickers {
		const stickers = this._components.stickers;
		if (!stickers) {
			throw new Error('stickers does not exist');
		}
		return stickers;
	}

	handleChange(change: ChangeStickers): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_STICKERS_TYPES.createSuccess:
				this.sendAction(new ActionStickersGet());
				break;
			default:
				this.updateViewStickers(change.data);
		}
	}

	protected _addHandlers() {
		super._addHandlers();
		this._addFormHandlers();
	}

	protected _addFormHandlers() {
		const stickerForm = this.stickers.stickerCreateForm;
		this.stickers.stickerCreateForm.vnode.handlers.push({
			event: 'submit',
			callback: async (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					stickerForm.formData,
					stickerForm.form,
				);
				if (!formData || !stickerForm.fileInput.value) {
					return;
				}
				const fileStr = await fileToString(
					formData.get('file') as File,
				);
				if (fileStr === null) {
					stickerForm.printError('Что-то пошло не так');
					return;
				}
				const stickerPayload: StickerPayload = {
					file: fileStr,
				};
				(
					this.stickers.fileInputVNode.element as HTMLInputElement
				).value = '';
				const preview = this.stickers.stickerCreateForm
					.img as HTMLImageElement;
				preview.src = '';
				api.createSticker(stickerPayload);
				stickerForm.clearError();
			},
		});
		this._addInputHandler();
	}

	private _addInputHandler(): void {
		this.stickers.fileInputVNode.handlers.push(
			{
				event: 'click',
				callback: (event) => {
					const label = this.stickers.stickerCreateForm.label;
					const preview = this.stickers.stickerCreateForm
						.img as HTMLImageElement;
					const input = event.target as HTMLInputElement;
					if (input.value) {
						input.value = '';
						event.preventDefault();
						label?.classList.remove('active');
						label.textContent = 'Прикрепить картинку';
						preview.src = '';
					}
				},
			},
			{
				event: 'change',
				callback: (event) => {
					const label = this.stickers.stickerCreateForm.label;
					const preview = this.stickers.stickerCreateForm
						.img as HTMLImageElement;
					const input = event.target as HTMLInputElement;
					if (input.files && input.files.length > 0) {
						if (label) {
							label.classList.add('active');
							label.textContent =
								'Картинка выбрана, нажмите, чтобы отменить';
						}
						const reader = new FileReader();
						reader.onload = function (e) {
							preview.src = e.target?.result as string;
						};
						reader.readAsDataURL(input.files[0]);
					}
				},
			},
		);
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderStickers();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	private _renderStickers(): void {
		this._components.stickers = new Stickers(
			this._configStickers.stickers,
			this.content,
		);
	}

	updateViewStickers(data: ViewStickersConfig) {
		super.updateViewHome(data);
		this._configStickers = Object.assign(this._configStickers, data);
		this._render();
	}

	render(): void {
		this._render();
		this.sendAction(new ActionStickersGet());
	}
}

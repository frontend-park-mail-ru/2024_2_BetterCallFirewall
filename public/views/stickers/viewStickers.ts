import { ActionStickersGetStickers } from '../../actions/actionStickers';
import { Root } from '../../components';
import { Stickers, StickersConfig } from '../../components/Stickers/Stickers';
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
			default:
				this.updateViewStickers(change.data);
		}
	}

	protected _addHandlers() {
		super._addHandlers();
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
		this.sendAction(new ActionStickersGetStickers());
	}
}

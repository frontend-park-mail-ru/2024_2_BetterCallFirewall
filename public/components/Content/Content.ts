import Component from '../Component';
import { Container, ContainerConfig, ContentMessage } from '../index';
import { Loader } from '../Loader/Loader';

export interface ContentConfig extends ContainerConfig {
	showLoader: boolean;
	infoMessage: string;
	errorMessage: string;
}

export class Content extends Container {
	protected _config: ContentConfig;

	/**
	 * Создает новый компонент Content
	 * @param {ContentConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: ContentConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Content.hbs');
	}

	protected _prerender(): void {
		if (this._config.showLoader) {
			new Loader({ key: 'loader' }, this);
		}
		if (this._config.errorMessage) {
			new ContentMessage(
				{
					key: 'contentMessage',
					text: this._config.errorMessage,
					error: true,
				},
				this,
			);
		}
		if (this._config.infoMessage) {
			new ContentMessage(
				{
					key: 'contentInfoMessage',
					text: this._config.infoMessage,
				},
				this,
			);
		}
		super._prerender();
	}
}

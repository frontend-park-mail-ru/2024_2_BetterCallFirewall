import Component from '../Component';
import { Input, InputConfig } from '../Input/Input';

export interface AttachmentsInputConfig extends InputConfig {}

export class AttachmentsInput extends Input {
	protected _config: AttachmentsInputConfig;

	constructor(config: AttachmentsInputConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('AttachmentsInput.hbs');
	}
}

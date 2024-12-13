import { FilePayload } from '../../models/file';
import fileType from '../../modules/fileType';
import Component, { ComponentConfig } from '../Component';

export enum FileType {
	Image = 'image',
}

export interface AttachmentConfig extends ComponentConfig {
	file: FilePayload;
}

export class Attachment extends Component {
	protected _config: AttachmentConfig;

	constructor(config: AttachmentConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get isImage(): boolean {
		return fileType(this._config.file) === FileType.Image;
	}

	render(): string {
		this._prerender();
		return this._render('Attachment.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
			isImage: this.isImage,
		};
	}
}

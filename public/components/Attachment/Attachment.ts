import { FilePayload } from '../../models/file';
import { fileTypeFromName } from '../../modules/files';
import Component, { ComponentConfig } from '../Component';
import { Loader } from '../Loader/Loader';

export enum FileType {
	Empty = 'empty',
	Image = 'image',
	File = 'file',
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
		return fileTypeFromName(this._config.file.src) === FileType.Image;
	}

	get isLoading(): boolean {
		return fileTypeFromName(this._config.file.src) == FileType.Empty;
	}

	render(): string {
		this._prerender();
		return this._render('Attachment.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		const loader = new Loader({ key: 'loader' }, this).render();
		this._templateContext = {
			...this._templateContext,
			isImage: this.isImage,
			isLoading: this.isLoading,
			loader,
		};
	}
}

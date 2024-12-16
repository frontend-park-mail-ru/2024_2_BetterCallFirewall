import { FilePayload } from '../../models/file';
import { fileNameFromURL, fileTypeFromName } from '../../modules/files';
import { VNode } from '../../modules/vdom';
import { Component, ComponentConfig } from '../Component';
import { Loader } from '../Loader/Loader';

export enum FileType {
	Empty = 'empty',
	Image = 'image',
	File = 'file',
}

export interface AttachmentConfig extends ComponentConfig {
	file: FilePayload;
	hasDeleteButton: boolean;
}

export class Attachment extends Component {
	protected _config: AttachmentConfig;

	constructor(config: AttachmentConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): AttachmentConfig {
		return this._config;
	}

	get isImage(): boolean {
		return fileTypeFromName(this._config.file.src) === FileType.Image;
	}

	get isFile(): boolean {
		return fileTypeFromName(this._config.file.src) === FileType.File;
	}

	get isLoading(): boolean {
		return fileTypeFromName(this._config.file.src) == FileType.Empty;
	}

	get deleteButtonVNode(): VNode {
		return this._findVNodeByClass('attachment__delete-button');
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
			fileName: fileNameFromURL(this._config.file.src),
			isImage: this.isImage,
			isFile: this.isFile,
			isLoading: this.isLoading,
			loader,
		};
	}
}

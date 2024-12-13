import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputFileLoaded,
} from '../../actions/actionAttachmentsInput';
import { FilePayload } from '../../models/file';
import fileToString from '../../modules/fileToString';
import { VNode } from '../../modules/vdom';
import { Attachment } from '../Attachment/Attachment';
import Component from '../Component';
import { Input, InputConfig } from '../Input/Input';

export interface AttachmentsInputConfig extends InputConfig {
	files: FilePayload[];
}

export class AttachmentsInput extends Input {
	protected _config: AttachmentsInputConfig;

	constructor(config: AttachmentsInputConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get inputVNode(): VNode {
		return this._findVNodeByKey('input');
	}

	protected _prerender(): void {
		super._prerender();
		const attachments = this._config.files.map((file, i) => {
			return new Attachment(
				{ key: `attachment-${i}`, file: file },
				this,
			).render();
		});
		this._templateContext = { ...this._templateContext, attachments };
	}

	render(): string {
		this._prerender();
		return this._render('AttachmentsInput.hbs');
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this.inputVNode.handlers.push({
			event: 'change',
			callback: (event) => {
				const fileList = (event.target as HTMLInputElement).files;
				if (!fileList) {
					return;
				}
				const oldFilesLength = this._config.files.length;
				const files = Array.from(fileList);
				this._sendAction(
					new ActionAttachmentsInputAddFiles(files.length),
				);
				files.forEach(async (file, i) => {
					const fileStr = await fileToString(file);
					if (fileStr) {
						this._sendAction(
							new ActionAttachmentsInputFileLoaded(
								{ src: fileStr, type: file.type },
								oldFilesLength + i,
							),
						);
					}
				});
			},
		});
	}
}

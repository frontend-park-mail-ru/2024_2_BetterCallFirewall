import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputDeleteFile,
	ActionAttachmentsInputFileLoaded,
} from '../../actions/actionAttachmentsInput';
import { FilePayload } from '../../models/file';
import fileToString from '../../modules/fileToString';
import { VNode } from '../../modules/vdom';
import { Attachment } from '../Attachment/Attachment';
import Component from '../Component';
import { Input, InputConfig } from '../Input/Input';

export interface BaseAttachmentInputConfig extends InputConfig {
	files: FilePayload[];
}

export abstract class BaseAttachmentInput extends Input {
	protected _config: BaseAttachmentInputConfig;
	protected _attachments: Attachment[] = [];

	constructor(config: BaseAttachmentInputConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): BaseAttachmentInputConfig {
		return this._config;
	}

	get inputVNode(): VNode {
		return this._findVNodeByKey('input');
	}

	protected _prerender(): void {
		super._prerender();
		this._attachments = this._config.files.map((file, i) => {
			return new Attachment(
				{ key: `attachment-${i}`, file: file, hasDeleteButton: true },
				this,
			);
		});
		this._templateContext = {
			...this._templateContext,
			attachments: this._attachments.map((item) => item.render()),
		};
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
								{ src: fileStr, mimeType: file.type },
								oldFilesLength + i,
							),
						);
					}
				});
			},
		});
		this._attachments.forEach((item, i) => {
			if (item.config.hasDeleteButton) {
				item.deleteButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						this._sendAction(
							new ActionAttachmentsInputDeleteFile(i),
						);
					},
				});
			}
		});
	}
}

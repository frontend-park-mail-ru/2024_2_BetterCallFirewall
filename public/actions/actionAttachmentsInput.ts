import { FilePayload } from '../models/file';
import { Action } from './action';

export const ACTION_ATTACHMENTS_INPUT_TYPES = {
	addFiles: 'actionAttachmentsInputAddFiles',
	fileLoaded: 'actionAttachmentsInputFileLoaded',
	deleteFile: 'actionAttachmentsInputDeleteFile',
};

export class ActionAttachmentsInputAddFiles implements Action {
	type: string = ACTION_ATTACHMENTS_INPUT_TYPES.addFiles;
	data: { filesCount: number };

	constructor(filesCount: number) {
		this.data = { filesCount };
	}
}

export class ActionAttachmentsInputFileLoaded implements Action {
	type: string = ACTION_ATTACHMENTS_INPUT_TYPES.fileLoaded;
	data: { filePayload: FilePayload; index: number };

	constructor(filePayload: FilePayload, index: number) {
		this.data = { filePayload, index };
	}
}

export class ActionAttachmentsInputDeleteFile implements Action {
	type: string = ACTION_ATTACHMENTS_INPUT_TYPES.deleteFile;
	data: { index: number };

	constructor(index: number) {
		this.data = { index };
	}
}

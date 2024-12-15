import { FilePayload } from '../models/file';
import { Action } from './action';

export const ACTION_ATTACHMENTS_INPUT_TYPES = {
	addFiles: 'actionAttachmentsInputAddFiles',
	fileLoaded: 'actionAttachmentsInputFileLoaded',
	deleteFile: 'actionAttachmentsInputDeleteFile',
};

export class ActionAttachmentsInputAddFiles implements Action {
	type: string = ACTION_ATTACHMENTS_INPUT_TYPES.addFiles;
	data: { filesCount: number; postId?: number };

	constructor(filesCount: number, postId?: number) {
		this.data = { filesCount, postId };
	}
}

export class ActionAttachmentsInputFileLoaded implements Action {
	type: string = ACTION_ATTACHMENTS_INPUT_TYPES.fileLoaded;
	data: { filePayload: FilePayload; index: number; postId?: number };

	constructor(filePayload: FilePayload, index: number, postId?: number) {
		this.data = { filePayload, index, postId };
	}
}

export class ActionAttachmentsInputDeleteFile implements Action {
	type: string = ACTION_ATTACHMENTS_INPUT_TYPES.deleteFile;
	data: { index: number; postId?: number };

	constructor(index: number, postId?: number) {
		this.data = { index, postId };
	}
}

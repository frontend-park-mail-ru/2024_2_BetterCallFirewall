import { Action } from '../actions/action';
import { ActionAppGoTo } from '../actions/actionApp';
import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputDeleteFile,
	ActionAttachmentsInputFileLoaded,
} from '../actions/actionAttachmentsInput';
import { ActionChatSendMessage } from '../actions/actionChat';
import {
	ActionCommentCancelEdit,
	ActionCommentCreate,
	ActionCommentEdit,
} from '../actions/actionComment';
import { ActionFeedPostCreateSuccess } from '../actions/actionFeed';
import { ActionPostEditRequestSuccess } from '../actions/actionPostEdit';
import { AttachmentsInputConfig } from '../components/AttachmentsInput/AttachmentsInput';
import deepClone from '../modules/deepClone';

export const reducerAttachmentsInput = (
	state: AttachmentsInputConfig,
	action: Action,
): AttachmentsInputConfig => {
	const newState = deepClone(state);
	switch (true) {
		case action instanceof ActionAttachmentsInputAddFiles: {
			const files = newState.files;
			const oldLength = files.length;
			files.length += action.data.filesCount;
			newState.files = files.fill(
				{ src: '', name: '', mimeType: '' },
				oldLength,
			);
			break;
		}
		case action instanceof ActionAttachmentsInputFileLoaded:
			newState.files[action.data.index] = action.data.filePayload;
			break;
		case action instanceof ActionAttachmentsInputDeleteFile:
			newState.files = newState.files.filter(
				(file, i) => action.data.index !== i,
			);
			break;
		case action instanceof ActionFeedPostCreateSuccess:
		case action instanceof ActionPostEditRequestSuccess:
		case action instanceof ActionChatSendMessage:
		case action instanceof ActionAppGoTo:
		case action instanceof ActionCommentCreate:
		case action instanceof ActionCommentEdit:
		case action instanceof ActionCommentCancelEdit:
			newState.files = [];
			break;
	}
	return newState;
};

import { Action } from '../actions/action';
import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputDeleteFile,
	ActionAttachmentsInputFileLoaded,
} from '../actions/actionAttachmentsInput';
import {
	ActionCommentCancelEdit,
	ActionCommentCreate,
	ActionCommentCreateSuccess,
	ActionCommentDeleteSuccess,
	ActionCommentEdit,
	ActionCommentEditSuccess,
	ActionCommentRequestSuccess,
} from '../actions/actionComment';
import {
	ActionPostCommentEdit,
	ActionPostCommentsOpenSwitch,
	ActionPostCommentsSortChange,
	ActionPostExpandSwitch,
} from '../actions/actionPost';
import { PostConfig } from '../components';
import { toCommentConfig } from '../models/comment';
import { filePayloadFromURL } from '../models/file';
import deepClone from '../modules/deepClone';
import { reducerAttachmentsInput } from './reducerAttachmentsInput';

export const reducerPost = (state: PostConfig, action: Action): PostConfig => {
	const newState = deepClone(state);
	switch (true) {
		case action instanceof ActionCommentCreateSuccess:
			newState.commentsConfigs = [
				toCommentConfig(action.data.commentResponse),
			].concat(newState.commentsConfigs);
			newState.commentsCount++;
			break;
		case action instanceof ActionCommentRequestSuccess: {
			const newComments = action.data.commentsResponses.map(
				(commentResponse) => {
					return toCommentConfig(commentResponse);
				},
			);
			if (!action.data.append) {
				newState.commentsConfigs = [];
			}
			newState.commentsConfigs =
				newState.commentsConfigs.concat(newComments);
			break;
		}
		case action instanceof ActionPostCommentsOpenSwitch:
			newState.commentsOpen = action.data.show;
			break;
		case action instanceof ActionCommentEditSuccess:
			newState.commentsConfigs.forEach((comment) => {
				if (comment.id === action.data.commentResponse.id) {
					Object.assign(
						comment,
						toCommentConfig(action.data.commentResponse),
					);
				}
			});
			break;
		case action instanceof ActionPostCommentEdit: {
			newState.commentEditId = action.data.commentId;
			const comment = newState.commentsConfigs.filter((comment) => {
				return comment.id === action.data.commentId;
			})[0];
			newState.commentAttachmentInput.files = comment.files.map((file) =>
				filePayloadFromURL(file),
			);
			break;
		}
		case action instanceof ActionCommentCancelEdit:
		case action instanceof ActionCommentEdit:
			newState.commentEditId = 0;
			break;
		case action instanceof ActionCommentDeleteSuccess:
			newState.commentsCount--;
			newState.commentsConfigs = newState.commentsConfigs.filter(
				(comment) => {
					return comment.id !== action.data.commentId;
				},
			);
			break;
		case action instanceof ActionPostCommentsSortChange:
			newState.commentsSort = action.data.sort;
			break;
		case action instanceof ActionPostExpandSwitch:
			newState.expanded = action.data.expand;
			break;
	}
	switch (true) {
		case action instanceof ActionAttachmentsInputAddFiles:
		case action instanceof ActionAttachmentsInputDeleteFile:
		case action instanceof ActionAttachmentsInputFileLoaded:
		case action instanceof ActionCommentCreate:
		case action instanceof ActionCommentEdit:
		case action instanceof ActionCommentCancelEdit:
			newState.commentAttachmentInput = reducerAttachmentsInput(
				newState.commentAttachmentInput,
				action,
			);
			break;
	}
	return newState;
};

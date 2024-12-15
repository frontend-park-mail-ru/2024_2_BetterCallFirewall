import { Action } from '../actions/action';
import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputDeleteFile,
	ActionAttachmentsInputFileLoaded,
} from '../actions/actionAttachmentsInput';
import { ACTION_FEED_TYPES } from '../actions/actionFeed';
import {
	ACTION_POST_EDIT_TYPES,
	ActionPostEditGoToData,
	ActionPostEditRequestSuccess,
	ActionPostEditUpdateData,
} from '../actions/actionPostEdit';
import config from '../config';
import { filePayloadFromURL } from '../models/file';
import deepClone from '../modules/deepClone';
import { ViewPostEditConfig } from '../views/PostEdit/viewPostEdit';
import { reducerAttachmentsInput } from './reducerAttachmentsInput';

const initialState: ViewPostEditConfig = deepClone(config.editPostConfig);

export const reducerPostEdit = (
	state: ViewPostEditConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_POST_EDIT_TYPES.goToPostEdit: {
			const actionData = action.data as ActionPostEditGoToData;
			const textAreas = newState.postEditForm.textAreas;
			if (textAreas) {
				textAreas.text.text = actionData.postConfig.text;
			}
			newState.postId = actionData.postConfig.id;
			newState.postEditForm.attachmentsInput.files =
				actionData.postConfig.files.map((file) =>
					filePayloadFromURL(file),
				);
			break;
		}
		case ACTION_FEED_TYPES.postCreateFail:
		case ACTION_FEED_TYPES.postCreateSuccess:
			return newState;
		case ACTION_POST_EDIT_TYPES.updatePostEdit:
			return { ...state, ...(action.data as ActionPostEditUpdateData) };
	}
	switch (true) {
		case action instanceof ActionAttachmentsInputAddFiles:
		case action instanceof ActionAttachmentsInputFileLoaded:
		case action instanceof ActionAttachmentsInputDeleteFile:
		case action instanceof ActionPostEditRequestSuccess:
			newState.postEditForm.attachmentsInput = reducerAttachmentsInput(
				newState.postEditForm.attachmentsInput,
				action,
			);
			break;
	}
	return newState;
};

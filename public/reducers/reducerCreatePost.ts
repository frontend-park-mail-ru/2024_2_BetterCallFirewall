import { Action } from '../actions/action';
import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputDeleteFile,
	ActionAttachmentsInputFileLoaded,
} from '../actions/actionAttachmentsInput';
import { ActionChatSendMessage } from '../actions/actionChat';
import {
	ACTION_CREATE_POST_TYPES,
	ActionUpdateCreatePostData,
} from '../actions/actionCreatePost';
import { ActionFeedPostCreateSuccess } from '../actions/actionFeed';
import { CreatePostFormConfig } from '../components/CreatePostForm/CreatePostForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewCreatePostConfig } from '../views/createPost/viewCreatePost';
import { reducerAttachmentsInput } from './reducerAttachmentsInput';

const initialCreatePostState: CreatePostFormConfig = deepClone(
	config.createPostConfig.createPostForm,
);

const initialState: ViewCreatePostConfig = {
	...config.homeConfig,
	createPostForm: initialCreatePostState,
};

export const reducerCreatePost = (
	state: ViewCreatePostConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_CREATE_POST_TYPES.updateCreatePost:
			return { ...state, ...(action.data as ActionUpdateCreatePostData) };
	}
	switch (true) {
		case action instanceof ActionAttachmentsInputAddFiles:
		case action instanceof ActionAttachmentsInputFileLoaded:
		case action instanceof ActionAttachmentsInputDeleteFile:
		case action instanceof ActionFeedPostCreateSuccess:
		case action instanceof ActionChatSendMessage:
			newState.createPostForm.attachmentsInput = reducerAttachmentsInput(
				newState.createPostForm.attachmentsInput,
				action,
			);
			break;
	}
	return newState;
};

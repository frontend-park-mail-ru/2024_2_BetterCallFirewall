import { Action } from '../actions/action';
import { ActionAppGoTo } from '../actions/actionApp';
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
import {
	ActionFeedPostCreateFail,
	ActionFeedPostCreateSuccess,
} from '../actions/actionFeed';
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
		case action instanceof ActionAppGoTo:
			newState.createPostForm.attachmentsInput = reducerAttachmentsInput(
				newState.createPostForm.attachmentsInput,
				action,
			);
			break;
	}
	switch (true) {
		case action instanceof ActionAppGoTo:
		case action instanceof ActionFeedPostCreateSuccess:
			newState.createPostForm.error = '';
			break;
		case action instanceof ActionFeedPostCreateFail:
			newState.createPostForm.error = 'Введены некорректные данные';
			break;
	}
	return newState;
};

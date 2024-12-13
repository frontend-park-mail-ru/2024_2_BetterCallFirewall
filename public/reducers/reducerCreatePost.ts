import { Action } from '../actions/action';
import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputFileLoaded,
} from '../actions/actionAttachmentsInput';
import {
	ACTION_CREATE_POST_TYPES,
	ActionUpdateCreatePostData,
} from '../actions/actionCreatePost';
import { CreatePostFormConfig } from '../components/CreatePostForm/CreatePostForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewCreatePostConfig } from '../views/createPost/viewCreatePost';

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
		case action instanceof ActionAttachmentsInputAddFiles: {
			const files = newState.createPostForm.attachmentsInput.files;
			const oldLength = files.length;
			files.length += action.data.filesCount;
			newState.createPostForm.attachmentsInput.files = files.fill(
				{ src: '', type: '' },
				oldLength,
			);
			break;
		}
		case action instanceof ActionAttachmentsInputFileLoaded:
			newState.createPostForm.attachmentsInput.files[action.data.index] =
				action.data.filePayload;
			break;
	}
	return newState;
};

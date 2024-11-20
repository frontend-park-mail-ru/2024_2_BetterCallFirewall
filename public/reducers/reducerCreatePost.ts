import { Action } from '../actions/action';
import {
	ACTION_CREATE_POST_TYPES,
	ActionUpdateCreatePostData,
} from '../actions/actionCreatePost';
import { ACTION_FEED_TYPES } from '../actions/actionFeed';
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
		case ACTION_CREATE_POST_TYPES.goToCreatePost:
		case ACTION_FEED_TYPES.postCreateFail:
		case ACTION_FEED_TYPES.postCreateSuccess:
			return newState;
		case ACTION_CREATE_POST_TYPES.updateCreatePost:
			return { ...state, ...(action.data as ActionUpdateCreatePostData) };
		default:
			return state;
	}
};

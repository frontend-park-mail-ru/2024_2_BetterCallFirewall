import { Action } from '../actions/action';
import { ACTION_FEED_TYPES } from '../actions/actionFeed';
import { ACTION_POST_EDIT_TYPES, ActionPostEditUpdateData } from '../actions/actionPostEdit';
import { IPostEditFormConfig } from '../components/PostEditForm/PostEditForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewPostEditConfig } from '../views/PostEdit/viewPostEdit';

const initialPostEditState: IPostEditFormConfig = deepClone(
	config.createPostConfig.createPostForm,
);

const initialState: ViewPostEditConfig = {
	...config.homeConfig,
	postEditForm: initialPostEditState,
};

export const reducerPostEdit = (
	state: ViewPostEditConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_POST_EDIT_TYPES.goToPostEdit:
		case ACTION_FEED_TYPES.postCreateFail:
		case ACTION_FEED_TYPES.postCreateSuccess:
			return newState;
		case ACTION_POST_EDIT_TYPES.updatePostEdit:
			return { ...state, ...(action.data as ActionPostEditUpdateData) };
		default:
			return state;
	}
};

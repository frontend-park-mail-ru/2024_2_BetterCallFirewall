import { Action } from '../actions/action';
import { ACTION_FEED_TYPES } from '../actions/actionFeed';
import {
	ACTION_POST_EDIT_TYPES,
	ActionPostEditGoToData,
	ActionPostEditUpdateData,
} from '../actions/actionPostEdit';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewPostEditConfig } from '../views/PostEdit/viewPostEdit';

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
			break;
		}
		case ACTION_FEED_TYPES.postCreateFail:
		case ACTION_FEED_TYPES.postCreateSuccess:
			return newState;
		case ACTION_POST_EDIT_TYPES.updatePostEdit:
			return { ...state, ...(action.data as ActionPostEditUpdateData) };
		default:
			return state;
	}
	return newState;
};

import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import {
	ACTION_GROUP_PAGE_TYPES,
	ActionGroupPageRequestSuccessData,
} from '../actions/actionGroupPage';
import app from '../app';
import config, { PAGE_LINKS } from '../config';
import { toGroupPageConfig } from '../models/group';
import { insertQueryParams } from '../modules/ajax';
import deepClone from '../modules/deepClone';
import { ViewGroupPageConfig } from '../views/groupPage/viewGroupPage';

const initialState: ViewGroupPageConfig = deepClone(config.groupPageConfig);

export const reducerGroupPage = (
	state: ViewGroupPageConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	switch (action?.type) {
		case ACTION_APP_TYPES.actionAppInit:
		case ACTION_APP_TYPES.goTo:
			newState.path = app.router.path;
			return newState;
		case ACTION_GROUP_PAGE_TYPES.groupPageRequestSuccess: {
			const actionData = action.data as ActionGroupPageRequestSuccessData;
			const groupPageConfig = toGroupPageConfig(
				newState.groupPage,
				actionData.groupPageResponse,
			);
			newState.path = `/${actionData.groupPageResponse.id}`;
			newState.groupPage = Object.assign(
				newState.groupPage,
				groupPageConfig,
			);
			newState.groupPage.createPostHref = insertQueryParams(
				PAGE_LINKS.createPost,
				{ community: `${newState.groupPage.id}` },
			);
			return newState;
		}
		default:
			return newState;
	}
};

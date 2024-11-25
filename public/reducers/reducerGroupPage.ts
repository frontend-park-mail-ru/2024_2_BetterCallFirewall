import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import { ActionPostsRequestFail } from '../actions/actionFeed';
import {
	ACTION_GROUP_PAGE_TYPES,
	ActionGroupPagePostsRequestSuccess,
	ActionGroupPageRequestSuccessData,
} from '../actions/actionGroupPage';
import { STATUS } from '../api/api';
import app from '../app';
import config, { PAGE_LINKS, ROOT } from '../config';
import { toGroupPageConfig } from '../models/group';
import { toPostConfig } from '../models/post';
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
			const url = new URL(ROOT + PAGE_LINKS.createPost);
			url.searchParams.append('community', `${newState.groupPage.id}`);
			newState.groupPage.createPostHref = url.pathname + url.search;
			return newState;
		}
	}
	switch (true) {
		case action instanceof ActionGroupPagePostsRequestSuccess:
			newState.groupPage.posts = action.data.postsResponses.map(
				(postResponse) => {
					return toPostConfig(postResponse);
				},
			);
			return newState;
		case action instanceof ActionPostsRequestFail:
			if (action.data.message) {
				newState.main.content.message = action.data.message;
			} else if (action.data.status === STATUS.noMoreContent) {
				newState.main.content.message = 'Постов больше нет';
			} else if (action.data.status !== STATUS.ok) {
				newState.main.content.message = 'Что-то пошло не так';
			}
			return newState;
		default:
			return newState;
	}
};

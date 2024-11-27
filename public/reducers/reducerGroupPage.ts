import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import { ActionPostsRequestFail } from '../actions/actionFeed';
import {
	ACTION_GROUP_PAGE_TYPES,
	ActionGroupPagePostsRequestSuccess,
	ActionGroupPageRequestSuccessData,
} from '../actions/actionGroupPage';
import { ActionPostLikeSuccess } from '../actions/actionPost';
import { STATUS } from '../api/api';
import app from '../app';
import config, { PAGE_LINKS, ROOT } from '../config';
import { toGroupPageConfig } from '../models/group';
import { groupPostResponseToPostConfig } from '../models/post';
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
			newState.groupPage = groupPageConfig;
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
					return groupPostResponseToPostConfig(
						newState.groupPage,
						postResponse,
					);
				},
			);
			return newState;
		case action instanceof ActionPostsRequestFail:
			newState.main.content.infoMessage = '';
			newState.main.content.errorMessage = '';
			if (action.data.status === STATUS.noMoreContent) {
				newState.main.content.infoMessage = 'Постов нет';
			} else if (action.data.status !== STATUS.ok) {
				newState.main.content.errorMessage = 'Что-то пошло не так';
			} else if (action.data.message) {
				newState.main.content.errorMessage = action.data.message;
			}
			newState.groupPage.posts = [];
			return newState;
		case action instanceof ActionPostLikeSuccess:
			newState.groupPage.posts.forEach((postConfig) => {
				if (postConfig.id === action.data.postId) {
					postConfig.likedByUser = !postConfig.likedByUser;
					if (postConfig.likedByUser) {
						postConfig.likes++;
					} else {
						postConfig.likes--;
					}
				}
			});
			return newState;
		default:
			return newState;
	}
};

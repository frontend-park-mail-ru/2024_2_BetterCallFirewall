import { Action } from '../actions/action';
import {
	ACTION_FEED_TYPES,
	ActionFeedPostCreateSuccessData,
	ActionPostsRequestFailData,
	ActionPostsRequestSuccessData,
} from '../actions/actionFeed';
import { ACTION_POST_TYPES, ActionPostLikeData } from '../actions/actionPost';
import { STATUS } from '../api/api';
import config from '../config';
import { toPostConfig } from '../models/post';
import deepClone from '../modules/deepClone';
import { ViewFeedConfig } from '../views/feed/viewFeed';

const initialState = deepClone(config.feedConfig);

export const reducerFeed = (
	state: ViewFeedConfig = initialState,
	action?: Action,
): ViewFeedConfig => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_FEED_TYPES.postCreateSuccess: {
			const actionData = action.data as ActionFeedPostCreateSuccessData;
			const postConfig = toPostConfig(actionData.post);
			newState.posts = [postConfig].concat(newState.posts);
			return newState;
		}
		case ACTION_FEED_TYPES.postsRequest:
			newState.pendingPostRequest = true;
			newState.main.content.showLoader = true;
			newState.main.content.message = '';
			return newState;
		case ACTION_FEED_TYPES.postsRequestSuccess: {
			newState.pendingPostRequest = false;
			newState.main.content.showLoader = false;
			newState.main.content.message = '';
			const newPosts = (
				action.data as ActionPostsRequestSuccessData
			).postsData.map((postResponse) => {
				return toPostConfig(postResponse);
			});
			newState.posts = newState.posts.concat(newPosts);
			return newState;
		}
		case ACTION_FEED_TYPES.postsRequestFail: {
			newState.pendingPostRequest = false;
			newState.main.content.showLoader = false;
			const data = action.data as ActionPostsRequestFailData;
			if (data.message) {
				newState.main.content.message = data.message;
			} else if (data.status === STATUS.noMoreContent) {
				newState.main.content.message = 'Постов больше нет';
			} else if (data.status !== STATUS.ok) {
				newState.main.content.message = 'Что-то пошло не так';
			}
			return newState;
		}
		case ACTION_POST_TYPES.likeSuccess: {
			const actionData = action.data as ActionPostLikeData;
			newState.posts.forEach((postConfig) => {
				if (postConfig.id === actionData.postId) {
					postConfig.likedByUser = !postConfig.likedByUser;
					if (postConfig.likedByUser) {
						postConfig.likes++;
					} else {
						postConfig.likes--;
					}
				}
			});
			return newState;
		}
		default:
			return state;
	}
};

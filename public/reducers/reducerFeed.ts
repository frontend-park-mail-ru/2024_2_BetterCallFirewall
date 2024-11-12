import { Action } from '../actions/action';
import {
	ACTION_FEED_TYPES,
	ActionPostsRequestFailData,
	ActionPostsRequestSuccessData,
} from '../actions/actionFeed';
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
		case ACTION_FEED_TYPES.postsRequestSuccess: {
			newState.errorMessage = '';
			const newPosts = (
				action.data as ActionPostsRequestSuccessData
			).postsData.map((postResponse) => {
				return toPostConfig(postResponse);
			});
			newState.posts = newState.posts.concat(newPosts);
			return newState;
		}
		case ACTION_FEED_TYPES.postsRequestFail: {
			const data = action.data as ActionPostsRequestFailData;
			if (data.message) {
				newState.errorMessage = data.message;
			} else if (data.status === STATUS.noMoreContent) {
				newState.errorMessage = 'Постов больше нет';
			} else if (data.status !== STATUS.ok) {
				newState.errorMessage = 'Что-то пошло не так';
			}
			return newState;
		}
		default:
			return state;
	}
};

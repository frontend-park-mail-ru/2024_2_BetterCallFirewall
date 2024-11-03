import { Action } from '../actions/action';
import {
	ACTION_FEED_TYPES,
	ActionPostsRequestFailData,
	ActionPostsRequestSuccessData,
} from '../actions/actionFeed';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import { ACTION_SIGNUP_TYPES } from '../actions/actionSignup';
import config, { ROOT } from '../config';
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
			).postsData.map(({ id, header, post_content }) => {
				return {
					id,
					key: `post-${id}`,
					avatar: ROOT + header.avatar,
					title: header.author,
					text: post_content.text,
					date: post_content.created_at,
				};
			});
			newState.posts = newState.posts.concat(newPosts);
			return newState;
		}
		case ACTION_FEED_TYPES.postsRequestFail: {
			console.log('reducerFeed: postsRequestFail:', action);
			const data = action.data as ActionPostsRequestFailData;
			if (data.message) {
				newState.errorMessage = data.message;
				// убрать хардкод
			} else if (data.status === 204) {
				newState.errorMessage = 'Постов больше нет';
			} else if (data.status !== 200) {
				newState.errorMessage = 'Что-то пошло не так';
			}
			return newState; // tmp
		}
		case ACTION_LOGIN_TYPES.loginClickSuccess:
		case ACTION_SIGNUP_TYPES.signupClickSuccess:
		default:
			return state;
	}
};
import { Action } from '../actions/action';
import {
	ActionCommentCreateSuccess,
	ActionCommentRequestSuccess,
} from '../actions/actionComment';
import {
	ACTION_FEED_TYPES,
	ActionFeedPostCreateSuccessData,
	ActionPostsRequestFailData,
	ActionPostsRequestSuccessData,
} from '../actions/actionFeed';
import {
	ACTION_POST_TYPES,
	ActionPostCommentsOpenSwitch,
	ActionPostLikeData,
} from '../actions/actionPost';
import { STATUS } from '../api/api';
import config from '../config';
import { toCommentConfig } from '../models/comment';
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
			newState.main.content.infoMessage = '';
			newState.main.content.errorMessage = '';
			return newState;
		case ACTION_FEED_TYPES.postsRequestSuccess: {
			newState.pendingPostRequest = false;
			newState.main.content.showLoader = false;
			newState.main.content.infoMessage = '';
			newState.main.content.errorMessage = '';
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
			if (data.status === STATUS.noMoreContent) {
				newState.main.content.infoMessage = 'Постов больше нет';
			} else if (data.status !== STATUS.ok) {
				newState.main.content.errorMessage = 'Что-то пошло не так';
			} else if (data.message) {
				newState.main.content.errorMessage = data.message;
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
	}
	switch (true) {
		case action instanceof ActionCommentCreateSuccess: {
			const post = newState.posts.filter((post) => {
				return post.id === action.data.postId;
			})[0];
			post.commentsConfigs = post.commentsConfigs.concat(
				toCommentConfig(action.data.commentResponse),
			);
			break;
		}
		case action instanceof ActionCommentRequestSuccess: {
			const post = newState.posts.filter((post) => {
				return post.id === action.data.postId;
			})[0];
			post.commentsConfigs = action.data.commentsResponses.map(
				(commentResponse) => {
					return toCommentConfig(commentResponse);
				},
			);
			break;
		}
		case action instanceof ActionPostCommentsOpenSwitch:
			{
				const post = newState.posts.filter((post) => {
					return post.id === action.data.postId;
				})[0];
				post.commentsOpen = action.data.show;
			}
			break;
	}
	return newState;
};

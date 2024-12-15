import { Action } from '../actions/action';
import {
	ActionCommentCreateSuccess,
	ActionCommentDeleteSuccess,
	ActionCommentEditSuccess,
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
	ActionPostCommentEdit,
	ActionPostCommentsOpenSwitch,
	ActionPostCommentsSortChange,
	ActionPostExpandSwitch,
	ActionPostLikeData,
} from '../actions/actionPost';
import { STATUS } from '../api/api';
import config from '../config';
import { toPostConfig } from '../models/post';
import deepClone from '../modules/deepClone';
import { ViewFeedConfig } from '../views/feed/viewFeed';
import { reducerPost } from './reducerPost';

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
		case action instanceof ActionPostCommentsOpenSwitch:
		case action instanceof ActionPostCommentEdit:
		case action instanceof ActionPostCommentsSortChange:
		case action instanceof ActionPostExpandSwitch:
		case action instanceof ActionCommentRequestSuccess:
		case action instanceof ActionCommentCreateSuccess:
		case action instanceof ActionCommentEditSuccess:
		case action instanceof ActionCommentDeleteSuccess:
			newState.posts.forEach((post) => {
				if (post.id === action.data.postId) {
					Object.assign(post, reducerPost(post, action));
				}
			});
			break;
	}
	return newState;
};

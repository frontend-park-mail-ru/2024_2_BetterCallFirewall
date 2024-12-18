import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import {
	ActionAttachmentsInputAddFiles,
	ActionAttachmentsInputDeleteFile,
	ActionAttachmentsInputFileLoaded,
} from '../actions/actionAttachmentsInput';
import {
	ActionCommentCancelEdit,
	ActionCommentCreate,
	ActionCommentCreateSuccess,
	ActionCommentDeleteSuccess,
	ActionCommentEdit,
	ActionCommentEditSuccess,
	ActionCommentRequestSuccess,
} from '../actions/actionComment';
import {
	ACTION_POST_TYPES,
	ActionPostCommentEdit,
	ActionPostCommentsOpenSwitch,
	ActionPostCommentsSortChange,
	ActionPostExpandSwitch,
	ActionPostLikeSuccessData,
} from '../actions/actionPost';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileSuccessData,
	ActionProfileRequestSuccessData,
} from '../actions/actionProfile';
import {
	ACTION_PROFILE_EDIT_TYPES,
	ActionProfileEditRequestSuccessData,
} from '../actions/actionProfileEdit';
import app from '../app';
import config from '../config';
import { toProfileConfig } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewProfileConfig } from '../views/profile/viewProfile';
import { reducerPost } from './reducerPost';

const initialState: ViewProfileConfig = deepClone(config.profileConfig);

export const reducerProfile = (
	state: ViewProfileConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	let actionData;
	switch (action?.type) {
		case ACTION_APP_TYPES.goTo:
			newState.path = app.router.path;
			return newState;
		case ACTION_PROFILE_EDIT_TYPES.requestSuccess: {
			actionData = action.data as ActionProfileEditRequestSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profileResponse,
			);
			newState.path = `/${actionData.profileResponse.id}`;
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		case ACTION_PROFILE_TYPES.profileRequestSuccess: {
			actionData = action.data as ActionProfileRequestSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profileResponse,
			);
			newState.path = `/${actionData.profileResponse.id}`;
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		case ACTION_PROFILE_TYPES.getYourOwnProfileSuccess: {
			const actionData =
				action.data as ActionProfileGetYourOwnProfileSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profile,
			);
			newState.path = `/${actionData.profile.id}`;
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		case ACTION_POST_TYPES.likeSuccess: {
			const actionData = action.data as ActionPostLikeSuccessData;
			newState.profile.posts.forEach((postConfig) => {
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
		case action instanceof ActionCommentCreate:
		case action instanceof ActionCommentEdit:
		case action instanceof ActionCommentCancelEdit:
		case action instanceof ActionCommentRequestSuccess:
		case action instanceof ActionCommentCreateSuccess:
		case action instanceof ActionCommentEditSuccess:
		case action instanceof ActionCommentDeleteSuccess:
		case action instanceof ActionAttachmentsInputAddFiles:
		case action instanceof ActionAttachmentsInputDeleteFile:
		case action instanceof ActionAttachmentsInputFileLoaded:
			newState.profile.posts.forEach((post) => {
				if (post.id === action.data.postId) {
					Object.assign(post, reducerPost(post, action));
				}
			});
			break;
	}
	return newState;
};

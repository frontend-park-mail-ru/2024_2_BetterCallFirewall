import { Action } from '../actions/action';
import {
	ActionCommentCreateSuccess,
	ActionCommentRequestSuccess,
} from '../actions/actionComment';
import { ActionPostCommentsOpenSwitch } from '../actions/actionPost';
import { PostConfig } from '../components';
import { toCommentConfig } from '../models/comment';
import deepClone from '../modules/deepClone';

export const reducerPost = (state: PostConfig, action: Action): PostConfig => {
	const newState = deepClone(state);
	switch (true) {
		case action instanceof ActionCommentCreateSuccess:
			newState.commentsConfigs = [
				toCommentConfig(action.data.commentResponse),
			].concat(newState.commentsConfigs);
			newState.commentsCount++;
			break;
		case action instanceof ActionCommentRequestSuccess: {
			const newComments = action.data.commentsResponses.map(
				(commentResponse) => {
					return toCommentConfig(commentResponse);
				},
			);
			if (!action.data.append) {
				newState.commentsConfigs = [];
			}
			newState.commentsConfigs =
				newState.commentsConfigs.concat(newComments);
			break;
		}

		case action instanceof ActionPostCommentsOpenSwitch:
			newState.commentsOpen = action.data.show;
			break;
	}
	return newState;
};

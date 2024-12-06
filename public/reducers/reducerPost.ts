import { Action } from '../actions/action';
import {
	ActionCommentCreateSuccess,
	ActionCommentEdit,
	ActionCommentEditSuccess,
	ActionCommentRequestSuccess,
} from '../actions/actionComment';
import {
	ActionPostCommentEdit,
	ActionPostCommentsOpenSwitch,
} from '../actions/actionPost';
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
		case action instanceof ActionCommentEditSuccess:
			newState.commentsConfigs.forEach((comment) => {
				Object.assign(
					comment,
					toCommentConfig(action.data.commentResponse),
				);
			});
			break;
		case action instanceof ActionPostCommentEdit:
			newState.commentEditId = action.data.commentId;
			break;
		case action instanceof ActionCommentEdit:
			newState.commentEditId = 0;
			break;
	}
	return newState;
};

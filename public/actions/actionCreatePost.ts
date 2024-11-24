import { CreatePostFormConfig } from '../components/CreatePostForm/CreatePostForm';
import { Action, ActionType } from './action';

export const ACTION_CREATE_POST_TYPES = {
	updateCreatePost: 'actionUpdateCreatePost',
};

export interface ActionUpdateCreatePostData extends CreatePostFormConfig {}

export class ActionUpdateCreatePost implements Action {
	type: ActionType;
	data: ActionUpdateCreatePostData;

	constructor(data: ActionUpdateCreatePostData) {
		this.type = ACTION_CREATE_POST_TYPES.updateCreatePost;
		this.data = data;
	}
}

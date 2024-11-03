import { ICreatePostFormConfig } from '../components/CreatePostForm/CreatePostForm';
import { Action, ActionType } from './action';

export const ACTION_CREATE_POST_TYPES = {
	updateCreatePost: 'actionUpdateCreatePost',
	goToCreatePost: 'actionCreatePostGoTo',
};

export interface ActionUpdateCreatePostData extends ICreatePostFormConfig {}

export class ActionUpdateCreatePost implements Action {
	type: ActionType;
	data: ActionUpdateCreatePostData;

	constructor(data: ActionUpdateCreatePostData) {
		this.type = ACTION_CREATE_POST_TYPES.updateCreatePost;
		this.data = data;
	}
}

export class ActionCreatePostGoTo implements Action {
	type: ActionType = ACTION_CREATE_POST_TYPES.goToCreatePost;
	data: object = {};
}

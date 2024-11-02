import { Action } from '../actions/action';
import { ACTION_CREATE_POST_TYPES, ActionUpdateCreatePostData } from '../actions/actionCreatePost';
import { ICreatePostFormConfig } from '../components/CreatePostForm/CreatePostForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewCreatePostConfig } from '../views/createPost/viewCreatePost';

const initialCreatePostState: ICreatePostFormConfig = deepClone(
    config.createPostConfig.createPostForm,
);

const initialState: ViewCreatePostConfig = {
    ...config.homeConfig,
    createPostForm: initialCreatePostState,
};

export const reducerCreatePost = (
    state: ViewCreatePostConfig = initialState,
    action?: Action,
) => {
    switch (action?.type) {
        case ACTION_CREATE_POST_TYPES.updateCreatePost:
            return { ...state, ...(action.data as ActionUpdateCreatePostData) };
        // case ACTION_MESSAGES_TYPES.goToMessages:
        default:
            return state;
    }
};
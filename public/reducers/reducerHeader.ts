import { Action } from '../actions/action';
import { ACTION_HEADER_TYPES } from '../actions/actionHeader';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetHeaderSuccessData,
} from '../actions/actionProfile';
import { IHeaderConfig } from '../components';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState = deepClone(config.homeConfig.main.header);

export const reducerHeader = (
	state?: IHeaderConfig,
	action?: Action,
): IHeaderConfig => {
	if (!state) {
		return initialState;
	}
	const newState = deepClone(state);
	if (action) {
		switch (action.type) {
			case ACTION_PROFILE_TYPES.getHeaderSuccess: {
				const actionData =
					action.data as ActionProfileGetHeaderSuccessData;
				newState.profile.id = actionData.headerResponse.author_id;
				break;
			}
			case ACTION_HEADER_TYPES.logoutClickFail:
				break;
		}
	}
	return newState;
};

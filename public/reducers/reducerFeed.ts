import { Action } from '../actions/action';
import { ACTION_USER_TYPES } from '../actions/actionUser';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewFeedConfig } from '../views/feed/viewFeed';

const initialState = deepClone(config.homeConfig);

export const reducerFeed = (
	state?: ViewFeedConfig,
	action?: Action,
): ViewFeedConfig => {
	if (!state) {
		return initialState;
	}
	const newState = state;
	if (action) {
		switch (action.type) {
			case ACTION_USER_TYPES.loginClickSuccess:
				break;
		}
	}
	return newState;
};

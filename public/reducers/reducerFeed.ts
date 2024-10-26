import { Action } from '../actions/action';
import { ACTION_USER_TYPES } from '../actions/actionUser';
import { IHomeConfig } from '../app';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState = deepClone(config.homeConfig);

export const reducerFeed = (
	state?: IHomeConfig,
	action?: Action,
): IHomeConfig => {
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

import { Action } from '../actions/action';
import { ACTION_HEADER_TYPES } from '../actions/actionHeader';
import { IHeaderConfig } from '../components';
import config from '../config';

const initialState = structuredClone(config.homeConfig.main.header);

export const reducerHeader = (
	state?: IHeaderConfig,
	action?: Action,
): IHeaderConfig => {
	if (!state) {
		return initialState;
	}
	const newState = state; // Потом поменять на let
	if (action) {
		switch (action?.type) {
			case ACTION_HEADER_TYPES.logoutClick:
				break;
		}
	}
	return newState;
};

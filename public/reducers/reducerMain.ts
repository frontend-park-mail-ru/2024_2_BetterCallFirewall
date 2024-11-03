import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import config from '../config';
import deepClone from '../modules/deepClone';
import { MainConfig } from '../views/home/viewHome';
import { reducerHeader } from './reducerHeader';

const initialState: MainConfig = deepClone(config.homeConfig.main);

export const reducerMain = (state?: MainConfig, action?: Action) => {
	if (!state) {
		return initialState;
	}
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	newState.header = reducerHeader(newState.header, action);
	switch (action.type) {
		case ACTION_APP_TYPES.actionAppInit:
			return state;
		default:
			return state;
	}
};

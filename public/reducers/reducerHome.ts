import { Action } from '../actions/action';
import { IHomeConfig } from '../app';
import config from '../config';
import deepClone from '../modules/deepClone';
import { reducerMain } from './reducerMain';
import { reducerMenu } from './reducerMenu';

const initialState = deepClone(config.homeConfig);

export const reducerHome = (state?: IHomeConfig, action?: Action) => {
	if (!state) {
		return initialState;
	}
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	newState.menu = reducerMenu(state.menu, action);
	newState.main = reducerMain(state.main, action);
	return newState;
};

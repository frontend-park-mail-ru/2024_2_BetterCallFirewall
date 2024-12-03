import { Action } from '../actions/action';
import config from '../config';
import deepClone from '../modules/deepClone';
import { MainConfig } from '../views/home/viewHome';
import { reducerHeader } from './reducerHeader';

const initialState: MainConfig = deepClone(config.homeConfig.main);

export const reducerMain = (
	state: MainConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	newState.header = reducerHeader(newState.header, action);
	return newState;
};

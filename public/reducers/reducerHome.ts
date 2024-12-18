import { Action } from '../actions/action';
import {
	ActionConfirmClose,
	ActionConfirmOpen,
} from '../actions/actionConfirm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { HomeConfig } from '../views/home/viewHome';
import { reducerMain } from './reducerMain';
import { reducerMenu } from './reducerMenu';

const initialState = deepClone(config.homeConfig);

export const reducerHome = (state?: HomeConfig, action?: Action) => {
	if (!state) {
		return initialState;
	}
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	newState.menu = reducerMenu(state.menu, action);
	newState.main = reducerMain(state.main, action);
	switch (true) {
		case action instanceof ActionConfirmOpen:
			newState.confirm = action.data.config;
			break;
		case action instanceof ActionConfirmClose:
			delete newState.confirm;
			break;
	}
	return newState;
};

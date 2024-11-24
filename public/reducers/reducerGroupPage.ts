import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import app from '../app';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewGroupPageConfig } from '../views/groupPage/viewGroupPage';

const initialState: ViewGroupPageConfig = deepClone(config.groupPageConfig);

export const reducerGroupPage = (
	state: ViewGroupPageConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	switch (action?.type) {
		case ACTION_APP_TYPES.actionAppInit:
		case ACTION_APP_TYPES.goTo:
			newState.path = app.router.path;
			return newState;
		default:
			return newState;
	}
};
import { Action } from '../actions/action';
import { ActionAppGoTo, ActionAppInit } from '../actions/actionApp';
import app from '../app';
import config, { PAGE_URLS } from '../config';
import deepClone from '../modules/deepClone';
import { ViewGroupEditConfig } from '../views/groupEdit/viewGroupEdit';

const initialState: ViewGroupEditConfig = deepClone(config.editGroupConfig);

export const reducerGroupEdit = (
	state: ViewGroupEditConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (true) {
		case action instanceof ActionAppInit:
		case action instanceof ActionAppGoTo: {
			const id = app.router.idFromPath(PAGE_URLS.groupEdit);
			if (id) {
				newState.groupId = id;
			}
		}
	}
	return newState;
};

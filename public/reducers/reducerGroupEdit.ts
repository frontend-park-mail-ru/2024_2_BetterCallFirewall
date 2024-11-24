import { Action } from '../actions/action';
import config from '../config';
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
	switch (action.type) {
		default:
			return state;
	}
	return newState;
};

import { Action } from '../actions/action';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewGroupsConfig } from '../views/groups/viewGroups';

const initialState = deepClone(config.groupsConfig);

export const reducerGroups = (
	state: ViewGroupsConfig = initialState,
	action?: Action,
): ViewGroupsConfig => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	return newState;
};

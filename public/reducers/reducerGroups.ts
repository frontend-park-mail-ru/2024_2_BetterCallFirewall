import { Action } from '../actions/action';
import {
	ACTION_GROUPS_TYPES,
	ActionGroupsGetGroupsSuccessData,
} from '../actions/actionGroups';
import config from '../config';
import { toGroupsConfig } from '../models/group';
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
	switch (action.type) {
		case ACTION_GROUPS_TYPES.getGroups:
			newState.groups.groupsConfig = [];
			return newState;
		case ACTION_GROUPS_TYPES.getGroupsSuccess: {
			const actionData = action.data as ActionGroupsGetGroupsSuccessData;
			newState.groups.groupsConfig = newState.groups.groupsConfig.concat(
				actionData.groups.map((group) => {
					return toGroupsConfig(group);
				}),
			);
			return newState;
		}
	}
	return newState;
};

import { Action } from '../actions/action';
import { ACTION_CREATE_GROUP_TYPES } from '../actions/actionCreateGroup';
import { ICreateGroupFormConfig } from '../components/CreateGroupForm/CreateGroupForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewCreateGroupConfig } from '../views/createGroup/viewCreateGroup';

const initialCreateGroupState: ICreateGroupFormConfig = deepClone(
	config.createGroupConfig.createGroupForm,
);

const initialState: ViewCreateGroupConfig = {
	...config.homeConfig,
	createGroupForm: initialCreateGroupState,
};

export const reducerCreateGroup = (
	state: ViewCreateGroupConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_CREATE_GROUP_TYPES.goToCreateGroup:
            return newState;
		default:
			return state;
	}
};

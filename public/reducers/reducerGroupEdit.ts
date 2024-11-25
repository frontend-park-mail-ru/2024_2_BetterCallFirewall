import { Action } from '../actions/action';
import { ActionAppGoTo, ActionAppInit } from '../actions/actionApp';
import { ActionGroupPageRequestSuccess } from '../actions/actionGroupPage';
import app from '../app';
import { GroupEditFormInputs } from '../components/GroupEditForm/GroupEditForm';
import config, { PAGE_URLS } from '../config';
import { FullGroupResponse } from '../models/group';
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
			return newState;
		}
		case action instanceof ActionGroupPageRequestSuccess:
			newState.groupEditForm.inputs =
				groupPageResponseToGroupEditFormInputs(
					newState.groupEditForm.inputs,
					action.data.groupPageResponse,
				);
			return newState;
	}
	return newState;
};

const groupPageResponseToGroupEditFormInputs = (
	inputs: GroupEditFormInputs,
	response: FullGroupResponse,
): GroupEditFormInputs => {
	inputs.name.text = response.name;
	inputs.description.text = response.about;
	return inputs;
};

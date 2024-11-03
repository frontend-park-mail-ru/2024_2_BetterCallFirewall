import { Action } from '../actions/action';
import {
	ACTION_PROFILE_EDIT_TYPES,
	ActionProfileEditUpdateData,
} from '../actions/actionProfileEdit';
import { IProfileEditFormConfig } from '../components/ProfileEditForm/ProfileEditForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewProfileEditConfig } from '../views/profileEdit/viewProfileEdit';

const initialProfileEditState: IProfileEditFormConfig = deepClone(
	config.profileEditConfig.profileEditForm,
);

const initialState: ViewProfileEditConfig = {
	...config.homeConfig,
	profileEditForm: initialProfileEditState,
};

export const reducerProfileEdit = (
	state: ViewProfileEditConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);

	switch (action?.type) {
		case ACTION_PROFILE_EDIT_TYPES.goToProfileEdit:
			return newState;
		case ACTION_PROFILE_EDIT_TYPES.updateProfileEdit: {
			const actionData = action.data as ActionProfileEditUpdateData;
			const inputs = newState.profileEditForm.inputs;
			if (inputs) {
				inputs.firstName.text = actionData.inputs.firstName;
				inputs.secondName.text = actionData.inputs.lastName;
			}
			return newState;
		}
		default:
			return newState;
	}
};

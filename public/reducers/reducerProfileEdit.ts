import { Action } from '../actions/action';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequestSuccessData,
} from '../actions/actionProfile';
import {
	ACTION_PROFILE_EDIT_TYPES,
	ActionProfileEditUpdateData,
} from '../actions/actionProfileEdit';
import { ChangePasswordFormConfig } from '../components/ChangePasswordForm/ChangePasswordForm';
import {
	IProfileEditFormConfig,
	ProfileEditFormInputs,
} from '../components/ProfileEditForm/ProfileEditForm';
import config from '../config';
import { FullProfileResponse } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewProfileEditConfig } from '../views/profileEdit/viewProfileEdit';

const initialProfileEditState: IProfileEditFormConfig = deepClone(
	config.profileEditConfig.profileEditForm,
);

const initialChangePasswordFormState: ChangePasswordFormConfig = deepClone(
	config.profileEditConfig.changePasswordForm,
);

const initialState: ViewProfileEditConfig = {
	...config.homeConfig,
	profileEditForm: initialProfileEditState,
	changePasswordForm: initialChangePasswordFormState,
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
				inputs.description.text = actionData.inputs.description;
			}
			return newState;
		}
		case ACTION_PROFILE_EDIT_TYPES.requestSuccess: {
			const actionData = action.data as ActionProfileRequestSuccessData;
			if (newState.profileEditForm.inputs) {
				newState.profileEditForm.inputs = profileResponseToInputs(
					actionData.profileResponse,
					newState.profileEditForm.inputs,
				);
			}
			return newState;
		}
		case ACTION_PROFILE_TYPES.profileRequestSuccess: {
			const actionData = action.data as ActionProfileRequestSuccessData;
			if (newState.profileEditForm.inputs) {
				newState.profileEditForm.inputs = profileResponseToInputs(
					actionData.profileResponse,
					newState.profileEditForm.inputs,
				);
			}
			return newState;
		}
		default:
			return newState;
	}
};

const profileResponseToInputs = (
	profileResponse: FullProfileResponse,
	inputs: ProfileEditFormInputs,
) => {
	inputs.firstName.text = profileResponse.first_name;
	inputs.secondName.text = profileResponse.last_name;
	inputs.description.text = profileResponse.bio;
	return inputs;
};

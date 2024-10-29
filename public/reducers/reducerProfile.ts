import { Action } from '../actions/action';
import {
	ACTION_PROFILE_TYPES,
	ActionUpdateProfileData,
} from '../actions/actionProfile';
import { IProfileConfig } from '../components/Profile/Profile';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewProfileConfig } from '../views/profile/viewProfile';

const initialProfileState: IProfileConfig = deepClone(
	config.profileConfig.profile,
);

const initialState: ViewProfileConfig = {
	home: config.homeConfig,
	profile: initialProfileState,
};

export const reducerProfile = (
	state: ViewProfileConfig = initialState,
	action?: Action,
) => {
	switch (action?.type) {
		case ACTION_PROFILE_TYPES.updateProfile:
			return { ...state, ...(action.data as ActionUpdateProfileData) };
		case ACTION_PROFILE_TYPES.goToProfile:
		default:
			return state;
	}
};

import { Action } from '../actions/action';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequestSuccessData,
	ActionUpdateProfileData,
} from '../actions/actionProfile';
import { IProfileConfig } from '../components/Profile/Profile';
import config from '../config';
import { toProfileConfig } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewProfileConfig } from '../views/profile/viewProfile';

const initialProfileState: IProfileConfig = deepClone(
	config.profileConfig.profile,
);

const initialState: ViewProfileConfig = {
	...config.homeConfig,
	profile: initialProfileState,
};

export const reducerProfile = (
	state: ViewProfileConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	switch (action?.type) {
		case ACTION_PROFILE_TYPES.updateProfile:
			return { ...state, ...(action.data as ActionUpdateProfileData) };
		case ACTION_PROFILE_TYPES.profileRequestSuccess:
			const data = action.data as ActionProfileRequestSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				data.profileResponse,
			);
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		case ACTION_PROFILE_TYPES.profileRequestFail:
		case ACTION_PROFILE_TYPES.goToProfile:
		default:
			return state;
	}
};

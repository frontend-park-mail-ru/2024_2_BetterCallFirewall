import { Action } from '../actions/action';
import { ACTION_PROFILE_TYPES } from '../actions/actionProfile';
import { IProfileConfig } from '../components/Profile/Profile';
import config from '../config';
import { ViewProfileConfig } from '../views/profile/viewProfile';

const initialProfileState: IProfileConfig = {
	key: 'profile',
	firstName: '',
	secondName: '',
	description: '',
	friendsCount: 0,
	groupsCount: 0,
	img: '',
};

const initialState: ViewProfileConfig = {
	...config.homeConfig,
	profile: initialProfileState,
};

export const reducerProfile = (
	state: ViewProfileConfig = initialState,
	action?: Action,
) => {
	switch (action?.type) {
		case ACTION_PROFILE_TYPES.updateProfile:
			return { ...state, ...action.data };
		case ACTION_PROFILE_TYPES.goToProfile:
		default:
			return state;
	}
};

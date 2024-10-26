import { Action } from '../actions/action';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import { ISignupFormConfig } from '../components';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState = deepClone(config.signupConfig);

export const reducerSignup = (state?: ISignupFormConfig, action?: Action) => {
	if (!state) {
		return initialState;
	}
	const newState = state;
	if (action) {
		switch (action.type) {
			case ACTION_LOGIN_TYPES.actionLoginToSignupClick:
				break;
		}
	}
	return newState;
};

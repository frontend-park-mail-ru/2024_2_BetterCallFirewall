import { Action } from '../actions/action';
import { ACTION_FORM_TYPES, IFormErrorData } from '../actions/actionForm';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import { ACTION_SIGNUP_TYPES } from '../actions/actionSignup';
import { ISignupFormConfig } from '../components';
import config from '../config';
import deepClone from '../modules/deepClone';

const inititalState = deepClone(config.signupConfig);

export const reducerSignup = (state?: ISignupFormConfig, action?: Action) => {
	if (!state) {
		return inititalState;
	}
	let newState = state;
	if (action) {
		switch (action.type) {
			case ACTION_FORM_TYPES.formError:
				newState = {
					...newState,
					error: (action.data as IFormErrorData)?.formError,
				};
				break;
			case ACTION_SIGNUP_TYPES.signupClickSuccess:
				break;
			case ACTION_LOGIN_TYPES.actionLoginToSignupClick:
				break;
			default:
				break;
		}
	}
	return newState;
};

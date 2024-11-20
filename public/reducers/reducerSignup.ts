import { Action } from '../actions/action';
import { ACTION_FORM_TYPES, IFormErrorData } from '../actions/actionForm';
import { SignupFormConfig } from '../components';
import config from '../config';
import deepClone from '../modules/deepClone';

const inititalState = deepClone(config.signupConfig);

export const reducerSignup = (state?: SignupFormConfig, action?: Action) => {
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
			default:
				break;
		}
	}
	return newState;
};

import { Action } from '../actions/action';
import { ActionAppGoTo } from '../actions/actionApp';
import { ActionFormError } from '../actions/actionForm';
import { SignupFormConfig } from '../components';
import config from '../config';
import deepClone from '../modules/deepClone';

const inititalState = deepClone(config.signupConfig);

export const reducerSignup = (state?: SignupFormConfig, action?: Action) => {
	if (!state) {
		return inititalState;
	}
	const newState = deepClone(state);
	if (action) {
		switch (true) {
			case action instanceof ActionAppGoTo:
				newState.error = '';
				break;
			case action instanceof ActionFormError:
				newState.error = action.data.formError;
				break;
		}
	}
	return newState;
};

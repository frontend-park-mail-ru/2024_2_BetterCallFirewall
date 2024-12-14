import { Action } from '../actions/action';
import { ACTION_FORM_TYPES, IFormErrorData } from '../actions/actionForm';
import { ILoginFormConfig } from '../components';
import config from '../config';
import deepClone from '../modules/deepClone';

const inititalState = deepClone(config.loginConfig);

export const reducerLogin = (state?: ILoginFormConfig, action?: Action) => {
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
		}
	}
	return newState;
};

import { Action } from '../actions/action';
import { ACTION_HEADER_TYPES } from '../actions/actionHeader';
import { ACTION_USER_TYPES, IFormErrorData } from '../actions/actionUser';
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
			case ACTION_USER_TYPES.formError:
				newState =  {
					...newState,
					error: (action.data as IFormErrorData)?.formError,
				};
				break;
			case ACTION_HEADER_TYPES.logoutClickSuccess:
				break;
			default:
				break;
		}
	}
	return newState;
};

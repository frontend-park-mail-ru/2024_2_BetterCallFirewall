import { Action } from '../actions/action';
import { ACTION_USER_TYPES, IFormErrorData } from '../actions/actionUser';
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
			case ACTION_USER_TYPES.formError:
				newState =  {
					...newState,
					error: (action.data as IFormErrorData)?.formError,
				};
				break;
            case ACTION_USER_TYPES.signupClickSuccess:
                break;
			default:
				break;
		}
	}
	return newState;
};

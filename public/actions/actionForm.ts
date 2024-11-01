import { ActionType } from './action';

export const ACTION_FORM_TYPES = {
	formError: 'formError',
};

export interface IFormErrorData {
	formError: string;
}

export class ActionFormError {
	type: ActionType;
	data: object;
	constructor(message: string) {
		this.type = ACTION_FORM_TYPES.formError;
		this.data = {
			formError: message,
		};
	}
}

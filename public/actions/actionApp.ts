import { Action, ActionType } from './action';

export const ACTION_APP_TYPES = {
	actionAppInit: 'actionAppInit',
};

export class ActionAppInit implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_APP_TYPES.actionAppInit;
		this.data = {};
	}
}

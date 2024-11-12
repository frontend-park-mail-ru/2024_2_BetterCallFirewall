import { Action, ActionType } from './action';

export const ACTION_APP_TYPES = {
	actionAppInit: 'actionAppInit',
	goTo: 'actionAppGoTo',
};

export class ActionAppInit implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_APP_TYPES.actionAppInit;
		this.data = {};
	}
}

export interface ActionAppGoToData {
	href: string;
}

export class ActionAppGoTo implements Action {
	type: ActionType = ACTION_APP_TYPES.goTo;
	data: ActionAppGoToData;

	constructor(href: string) {
		this.data = { href };
	}
}

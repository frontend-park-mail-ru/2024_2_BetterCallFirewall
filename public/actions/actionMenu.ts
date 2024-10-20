import { Action, ActionType } from './action';

export const ACTION_MENU_TYPES = {
	menuLinkClick: 'menuLinkClick',
};

export interface ActionMenuLinkClickData {
	href: string;
}

export class ActionMenuLinkClick implements Action {
	type: ActionType;
	data: ActionMenuLinkClickData;
	constructor(type: ActionType, data: ActionMenuLinkClickData) {
		this.type = type;
		this.data = data;
	}
}

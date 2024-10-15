import { Action, ActionType } from './action';

export const HOME_ACTION_TYPES = {
	menuLinkClick: 'menuLinkClick',
};

interface MenuLinkClickActionData {
	href: string;
}

export class MenuLinkClickAction implements Action {
	type: ActionType;
	data: MenuLinkClickActionData;
	constructor(type: ActionType, data: MenuLinkClickActionData) {
		this.type = type;
		this.data = data;
	}
}

import { Action, ActionType } from './action';

export const ACTION_CHAT_TYPES = {
	goToChat: 'goToChat',
	updateChat: 'updateChat',
};

export class ActionUpdateChat implements Action {
	type: ActionType;
	data: object;
	constructor() {
		this.type = ACTION_CHAT_TYPES.updateChat;
		this.data = {};
	}
}

export interface ActionChatGoToChatData {
	userId: number;
}

export class ActionChatGoToChat implements Action {
	type: ActionType;
	data: ActionChatGoToChatData;

	constructor(data: ActionChatGoToChatData) {
		this.type = ACTION_CHAT_TYPES.goToChat;
		this.data = data;
	}
}

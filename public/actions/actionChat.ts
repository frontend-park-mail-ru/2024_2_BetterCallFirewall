import { ChatResponse } from '../models/chat';
import { Action, ActionType } from './action';

export const ACTION_CHAT_TYPES = {
	goToChat: 'goToChat',
	updateChat: 'updateChat',
	requestChat: 'ActionChatRequest',
	requestChatSuccess: 'ActionChatRequestSuccess',
	requestChatFail: 'ActionChatRequestFail',
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

export class ActionChatRequest implements Action {
	type: ActionType = ACTION_CHAT_TYPES.requestChat;
	data: object = {};
}

export interface ActionChatRequestSuccessData {
	chatResponse: ChatResponse;
}

export class ActionChatRequestSuccess implements Action {
	type: ActionType = ACTION_CHAT_TYPES.requestChatSuccess;
	data: ActionChatRequestSuccessData;

	constructor(chatResponse: ChatResponse) {
		this.data = { chatResponse };
	}
}

export class ActionChatRequestFail implements Action {
	type: ActionType = ACTION_CHAT_TYPES.requestChatFail;
	data: object = {};
}

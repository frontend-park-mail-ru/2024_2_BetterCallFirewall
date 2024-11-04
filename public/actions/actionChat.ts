import { IChatConfig } from '../components/Chat/Chat';
import { MessageResponse } from '../models/message';
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
	chatConfig: IChatConfig;
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
	messagesResponse: MessageResponse[];
}

export class ActionChatRequestSuccess implements Action {
	type: ActionType = ACTION_CHAT_TYPES.requestChatSuccess;
	data: ActionChatRequestSuccessData;

	constructor(messagesResponse: MessageResponse[]) {
		this.data = { messagesResponse };
	}
}

export class ActionChatRequestFail implements Action {
	type: ActionType = ACTION_CHAT_TYPES.requestChatFail;
	data: object = {};
}

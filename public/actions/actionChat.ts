import { MessageResponse, MessageSend } from '../models/message';
import { Action, ActionType } from './action';

export const ACTION_CHAT_TYPES = {
	goToChat: 'goToChat',
	updateChat: 'updateChat',
	requestChat: 'ActionChatRequest',
	requestChatSuccess: 'ActionChatRequestSuccess',
	requestChatFail: 'ActionChatRequestFail',
	sendMessage: 'ActionChatSendMessage',
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
	href: string;
}

export class ActionChatGoToChat implements Action {
	type: ActionType;
	data: ActionChatGoToChatData;

	constructor(data: ActionChatGoToChatData) {
		this.type = ACTION_CHAT_TYPES.goToChat;
		this.data = data;
	}
}

export interface ActionChatRequestData {
	id: number;
	lastTime?: string;
}

export class ActionChatRequest implements Action {
	type: ActionType = ACTION_CHAT_TYPES.requestChat;
	data: ActionChatRequestData;

	constructor(id: number, lastTime?: string) {
		this.data = { id, lastTime };
	}
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

export interface ActionChatSendMessageData {
	message: MessageSend;
}

export class ActionChatSendMessage implements Action {
	type: ActionType = ACTION_CHAT_TYPES.sendMessage;
	data: ActionChatSendMessageData;

	constructor(message: MessageSend) {
		this.data = { message };
	}
}

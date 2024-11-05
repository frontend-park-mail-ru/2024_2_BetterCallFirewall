import { IMessageConfig } from '../components/Message/Message';
import { ChatResponse } from '../models/chat';
import { MessageResponse, MessageSend } from '../models/message';
import { Action, ActionType } from './action';

export const ACTION_MESSAGES_TYPES = {
	goToMessages: 'goToMessages',
	updateMessages: 'updateMessages',
	requestMessages: 'actionMessagesRequest',
	requestMessagesSuccess: 'actionMessagesRequestSuccess',
	requestMessagesFail: 'actionMessagesRequestFail',
	newMessage: 'actionMessagesNewMessage',
	sendMessage: 'actionMessagesSendMessage',
};

export interface ActionUpdateMessagesData extends IMessageConfig {}

export class ActionUpdateMessages implements Action {
	type: ActionType;
	data: ActionUpdateMessagesData;
	constructor(data: ActionUpdateMessagesData) {
		this.type = ACTION_MESSAGES_TYPES.updateMessages;
		this.data = data;
	}
}

export type ActionGoToMessagesData = {
	href: string;
};

export class ActionGoToMessages implements Action {
	type: ActionType;
	data: object;

	constructor(data: ActionGoToMessagesData) {
		this.type = ACTION_MESSAGES_TYPES.goToMessages;
		this.data = data;
	}
}

export class ActionMessagesRequest implements Action {
	type: ActionType = ACTION_MESSAGES_TYPES.requestMessages;
	data: object = {};
}

export interface ActionMessagesRequestSuccessData {
	chatsResponse: ChatResponse[];
}

export class ActionMessagesRequestSuccess implements Action {
	type: ActionType = ACTION_MESSAGES_TYPES.requestMessagesSuccess;
	data: ActionMessagesRequestSuccessData;

	constructor(chatsResponse: ChatResponse[]) {
		this.data = { chatsResponse };
	}
}

export class actionMessagesRequestFail implements Action {
	type: ActionType = ACTION_MESSAGES_TYPES.requestMessagesFail;
	data: object = {};
}

export interface ActionMessagesNewMessageData {
	messageResponse: MessageResponse;
}

export class ActionMessagesNewMessage implements Action {
	type: ActionType = ACTION_MESSAGES_TYPES.newMessage;
	data: ActionMessagesNewMessageData;

	constructor(messageResponse: MessageResponse) {
		this.data = { messageResponse };
	}
}

export interface ActionMesssagesSendMessageData {
	message: MessageSend;
}

export class ActionMesssagesSendMessage implements Action {
	type: ActionType = ACTION_MESSAGES_TYPES.sendMessage;
	data: ActionMesssagesSendMessageData;

	constructor(message: MessageSend) {
		this.data = { message };
	}
}

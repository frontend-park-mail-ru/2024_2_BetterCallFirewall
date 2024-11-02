import { IChatConfig } from '../components/Chat/Chat';
import { Action, ActionType } from './action';

export const ACTION_CHAT_TYPES = {
	goToChat: 'goToChat',
	updateChat: 'updateChat',
};

export interface ActionUpdateChatData extends IChatConfig {}

export class ActionUpdateChat implements Action {
	type: ActionType;
	data: ActionUpdateChatData;
	constructor(data: ActionUpdateChatData) {
		this.type = ACTION_CHAT_TYPES.updateChat;
		this.data = data;
	}
}

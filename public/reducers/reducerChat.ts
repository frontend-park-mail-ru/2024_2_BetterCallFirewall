import { Action } from '../actions/action';
import {
	ACTION_CHAT_TYPES,
	ActionChatGoToChatData,
	ActionChatRequestSuccessData,
} from '../actions/actionChat';
import { IChatConfig } from '../components/Chat/Chat';
import config from '../config';
import { toChatMessageConfig } from '../models/message';
import deepClone from '../modules/deepClone';
import { ViewChatConfig } from '../views/chat/viewChat';

const initialChatState: IChatConfig = deepClone(config.chatConfig.chat);

const initialState: ViewChatConfig = {
	...config.homeConfig,
	chat: initialChatState,
};

export const reducerChat = (
	state: ViewChatConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	switch (action?.type) {
		case ACTION_CHAT_TYPES.requestChatSuccess: {
			const actionData = action.data as ActionChatRequestSuccessData;
			newState.chat.messages = actionData.messagesResponse.map(
				(messageResponse) => {
					return toChatMessageConfig(newState.chat, messageResponse);
				},
			);
			return newState;
		}
		case ACTION_CHAT_TYPES.updateChat:
			return newState;
		case ACTION_CHAT_TYPES.goToChat: {
			const actionData = action.data as ActionChatGoToChatData;
			newState.chat = actionData.chatConfig;
			return newState;
		}
		default:
			return state;
	}
};

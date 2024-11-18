import { Action } from '../actions/action';
import {
	ACTION_MESSAGES_TYPES,
	ActionMessagesNewMessageData,
	ActionMessagesRequestFailData,
	ActionMessagesRequestSuccessData,
	ActionUpdateMessagesData,
} from '../actions/actionMessages';
import { IMessageConfig } from '../components/Message/Message';
import config from '../config';
import { toMessageConfig } from '../models/chat';
import deepClone from '../modules/deepClone';
import parseTime from '../modules/parseTime';
import { ViewMessagesConfig } from '../views/messages/viewMessages';

const initialMessagesState: IMessageConfig[] = deepClone(
	config.messagesConfig.messages,
);

const initialState: ViewMessagesConfig = {
	...config.homeConfig,
	messages: initialMessagesState,
};

export const reducerMessages = (
	state: ViewMessagesConfig = initialState,
	action?: Action,
) => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_MESSAGES_TYPES.requestMessagesFail: {
			const actionData = action.data as ActionMessagesRequestFailData;
			if (actionData.message) {
				newState.main.content.message = actionData.message;
			}
			return newState;
		}
		case ACTION_MESSAGES_TYPES.newMessage: {
			const actionData = action.data as ActionMessagesNewMessageData;
			newState.messages = newState.messages.map((messageConfig) => {
				if (
					messageConfig.authorId === actionData.messageResponse.sender
				) {
					messageConfig.lastMessage =
						actionData.messageResponse.content;
					messageConfig.date = parseTime(
						actionData.messageResponse.created_at,
					);
					return messageConfig;
				}
				return messageConfig;
			});
			return newState;
		}
		case ACTION_MESSAGES_TYPES.requestMessagesSuccess: {
			const actionData = action.data as ActionMessagesRequestSuccessData;
			newState.messages = actionData.chatsResponse.map((chatRespone) => {
				return toMessageConfig(chatRespone);
			});
			return newState;
		}
		case ACTION_MESSAGES_TYPES.updateMessages:
			return { ...state, ...(action.data as ActionUpdateMessagesData) };
		case ACTION_MESSAGES_TYPES.goToMessages:
		default:
			return newState;
	}
};

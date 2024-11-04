import { Action } from '../actions/action';
import {
	ACTION_MESSAGES_TYPES,
	ActionMessagesRequestSuccessData,
	ActionUpdateMessagesData,
} from '../actions/actionMessages';
import { IMessageConfig } from '../components/Message/Message';
import config from '../config';
import { toMessageConfig } from '../models/chat';
import deepClone from '../modules/deepClone';
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
	switch (action?.type) {
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
			return state;
	}
};

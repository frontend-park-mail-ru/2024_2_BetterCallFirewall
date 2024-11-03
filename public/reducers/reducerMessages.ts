import { Action } from '../actions/action';
import {
	ACTION_MESSAGES_TYPES,
	ActionUpdateMessagesData,
} from '../actions/actionMessages';
import { IMessageConfig } from '../components/Message/Message';
import config from '../config';
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
	switch (action?.type) {
		case ACTION_MESSAGES_TYPES.updateMessages:
			return { ...state, ...(action.data as ActionUpdateMessagesData) };
		case ACTION_MESSAGES_TYPES.goToMessages:
		default:
			return state;
	}
};

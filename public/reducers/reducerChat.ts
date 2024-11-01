import { Action } from '../actions/action';
import {
    ACTION_CHAT_TYPES,
    ActionUpdateChatData,
} from '../actions/actionChat';
import { IChatConfig } from '../components/Chat/Chat';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewChatConfig } from '../views/chat/viewChat';

const initialChatState: IChatConfig = deepClone(
    config.chatConfig.chat,
);

const initialState: ViewChatConfig = {
    ...config.homeConfig,
    chat: initialChatState,
};

export const reducerChat = (
    state: ViewChatConfig = initialState,
    action?: Action,
) => {
    switch (action?.type) {
        case ACTION_CHAT_TYPES.updateChat:
            return { ...state, ...(action.data as ActionUpdateChatData) };
        case ACTION_CHAT_TYPES.goToChat:
        default:
            return state;
    }
};
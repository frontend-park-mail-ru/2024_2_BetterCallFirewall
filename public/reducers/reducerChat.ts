import { Action } from '../actions/action';
import {
	ACTION_CHAT_TYPES,
	ActionChatRequestSuccessData,
	ActionChatSendMessageData,
} from '../actions/actionChat';
import {
	ACTION_MESSAGES_TYPES,
	ActionMessagesNewMessageData,
} from '../actions/actionMessages';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequestSuccessData,
} from '../actions/actionProfile';
import { ChatConfig } from '../components/Chat/Chat';
import config from '../config';
import { MessageResponse, toChatMessageConfig } from '../models/message';
import { toChatConfig } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewChatConfig } from '../views/chat/viewChat';
import { reducerHome } from './reducerHome';

const initialChatState: ChatConfig = deepClone(config.chatConfig.chat);

const initialState: ViewChatConfig = {
	...config.homeConfig,
	chat: initialChatState,
};

export const reducerChat = (
	state: ViewChatConfig = initialState,
	action?: Action,
) => {
	const newState = Object.assign(
		deepClone(state),
		reducerHome(state, action),
	);
	switch (action?.type) {
		case ACTION_PROFILE_TYPES.profileRequestSuccess:
			newState.chat = toChatConfig(
				newState.chat,
				(action.data as ActionProfileRequestSuccessData)
					.profileResponse,
			);
			newState.chat.myId = newState.main.header.profile.id;
			newState.chat.myName = newState.main.header.profile.name;
			newState.chat.myAvatar = newState.main.header.profile.avatar;
			return newState;
		case ACTION_CHAT_TYPES.sendMessage: {
			const actionData = action.data as ActionChatSendMessageData;
			if (newState.chat.companionId !== newState.chat.myId) {
				const messageResponse: MessageResponse = {
					sender: newState.main.header.profile.id,
					content: actionData.message.content,
					created_at: new Date().toISOString(),
				};
				newState.chat.messages.push(
					toChatMessageConfig(newState.chat, messageResponse),
				);
			}
			newState.chat.inputText = '';
			return newState;
		}
		case ACTION_MESSAGES_TYPES.newMessage: {
			const actionData = action.data as ActionMessagesNewMessageData;
			if (
				actionData.messageResponse.sender === newState.chat.companionId
			) {
				newState.chat.messages.push(
					toChatMessageConfig(
						newState.chat,
						actionData.messageResponse,
					),
				);
			}
			return newState;
		}
		case ACTION_CHAT_TYPES.requestChatSuccess: {
			const actionData = action.data as ActionChatRequestSuccessData;
			const newMessages = actionData.messagesResponse
				.map((messageResponse) => {
					return toChatMessageConfig(newState.chat, messageResponse);
				})
				.reverse();
			newState.chat.messages = newMessages.concat(newState.chat.messages);
			return newState;
		}
		case ACTION_CHAT_TYPES.updateChat:
			return newState;
		case ACTION_CHAT_TYPES.goToChat: {
			newState.chat.messages = [];
			return newState;
		}
		default:
			return state;
	}
};

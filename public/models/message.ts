import { IChatConfig } from '../components/Chat/Chat';
import { IChatMessageConfig } from '../components/ChatMessage/ChatMessage';
import parseTime from '../modules/parseTime';

export interface MessageSend {
	content: string;
	receiver: number;
}

export interface MessageResponse {
	sender: number;
	content: string;
	created_at: string;
}

export const toChatMessageConfig = (
	chatConfig: IChatConfig,
	messageResponse: MessageResponse,
): IChatMessageConfig => {
	return {
		key: `chat-message-${messageResponse.sender}`,
		userId: messageResponse.sender,
		messageAvatar: chatConfig.companionAvatar,
		messageName: chatConfig.companionName,
		messageText: messageResponse.content,
		createdAt: parseTime(messageResponse.created_at),
	};
};

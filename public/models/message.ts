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
	const isCompanion = messageResponse.sender === chatConfig.companionId;
	return {
		key: `chat-message-${messageResponse.sender}`,
		userId: isCompanion ? messageResponse.sender : chatConfig.companionId,
		messageAvatar: isCompanion
			? chatConfig.companionAvatar
			: chatConfig.myAvatar,
		messageName: isCompanion ? chatConfig.companionName : chatConfig.myName,
		messageText: messageResponse.content,
		createdAt: parseTime(messageResponse.created_at),
		createdAtISO: messageResponse.created_at,
		isAuthor: !isCompanion,
	};
};

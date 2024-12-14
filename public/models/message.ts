import { ChatConfig } from '../components/Chat/Chat';
import { ChatMessageConfig } from '../components/ChatMessage/ChatMessage';
import parseTime from '../modules/parseTime';

interface MessageContent {
	text: string;
	file_path: string[];
	sticker_path: string;
}

export interface MessagePayload {
	content: string;
	receiver: number;
}

export interface MessageResponse {
	sender: number;
	content: MessageContent;
	created_at: string;
}

export const toChatMessageConfig = (
	chatConfig: ChatConfig,
	messageResponse: MessageResponse,
): ChatMessageConfig => {
	const isCompanion = messageResponse.sender === chatConfig.companionId;
	return {
		key: `chat-message-${messageResponse.sender}`,
		userId: isCompanion ? messageResponse.sender : chatConfig.companionId,
		messageAvatar: isCompanion
			? chatConfig.companionAvatar
			: chatConfig.myAvatar,
		messageName: isCompanion ? chatConfig.companionName : chatConfig.myName,
		messageText: messageResponse.content.text,
		createdAt: parseTime(messageResponse.created_at),
		createdAtISO: messageResponse.created_at,
		isAuthor: !isCompanion,
	};
};

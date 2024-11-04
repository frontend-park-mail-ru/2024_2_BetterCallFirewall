import { IMessageConfig } from '../components/Message/Message';
import { PAGE_LINKS } from '../config';
import parseImage from '../modules/parseImage';
import parseTime from '../modules/parseTime';
import { MessageResponse } from './message';
import { ShortProfileResponse } from './profile';

export interface ChatResponse {
	last_message: MessageResponse;
	receiver: ShortProfileResponse;
}

export const toMessageConfig = (chatResponse: ChatResponse): IMessageConfig => {
	return {
		key: `message-${chatResponse.receiver.id}`,
		authorId: chatResponse.receiver.id,
		avatar: parseImage(chatResponse.receiver.avatar),
		name: `${chatResponse.receiver.first_name} ${chatResponse.receiver.last_name}`,
		lastMessage: chatResponse.last_message.content,
		date: parseTime(chatResponse.last_message.created_at),
		unreadedCount: -1,
		href: PAGE_LINKS.chat,
	};
};

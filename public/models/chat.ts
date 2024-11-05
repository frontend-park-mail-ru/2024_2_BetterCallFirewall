import { IMessageConfig } from '../components/Message/Message';
import { PAGE_LINKS } from '../config';
import parseImage from '../modules/parseImage';
import parseTime from '../modules/parseTime';
import { HeaderResponse } from './header';

export interface ChatResponse {
	last_message: string;
	last_date: string;
	receiver: HeaderResponse;
}

export const toMessageConfig = (chatResponse: ChatResponse): IMessageConfig => {
	return {
		key: `message-${chatResponse.receiver.author_id}`,
		authorId: chatResponse.receiver.author_id,
		avatar: parseImage(chatResponse.receiver.avatar),
		name: `${chatResponse.receiver.author}`,
		lastMessage: chatResponse.last_message,
		date: parseTime(chatResponse.last_date),
		unreadedCount: -1,
		href: PAGE_LINKS.chat,
	};
};

import { MessageConfig } from '../components/Message/Message';
import { PAGE_URLS } from '../config';
import parseImage from '../modules/parseImage';
import parseTime from '../modules/parseTime';
import { HeaderResponse } from './header';

export interface ChatResponse {
	last_message: string;
	last_date: string;
	receiver: HeaderResponse;
}

export const toMessageConfig = (chatResponse: ChatResponse): MessageConfig => {
	const id = chatResponse.receiver.author_id;
	return {
		key: `message-${id}`,
		authorId: id,
		avatar: parseImage(chatResponse.receiver.avatar),
		name: `${chatResponse.receiver.author}`,
		lastMessage: chatResponse.last_message,
		date: parseTime(chatResponse.last_date),
		unreadedCount: -1,
		href: PAGE_URLS.chat + `/${id}`,
	};
};

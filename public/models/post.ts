import { IPostConfig } from '../components';

interface Header {
	authorId: number;
	author: string;
	avatar: string;
}

interface PostContent {
	text: string;
	file: string;
	created_at: string;
}

export interface PostResponse {
	id: number;
	header: Header;
	post_content: PostContent;
}

export const toPostConfig = (postResponse: PostResponse): IPostConfig => {
	return {
		id: postResponse.id,
		key: `post-${postResponse.id}`,
		avatar: postResponse.header.avatar,
		title: postResponse.header.author,
		text: postResponse.post_content.text,
		date: postResponse.post_content.created_at,
	};
};

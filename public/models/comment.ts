import { CommentConfig } from '../components/Comment/Comment';
import parseImage from '../modules/parseImage';
import parseTime from '../modules/parseTime';

export interface Header {
	author_id: number;
	author: string;
	avatar: string;
	community_id: number;
}

interface Content {
	text: string;
	file: string;
	created_at: string;
	updated_at: string;
}

export interface CommentResponse {
	id: number;
	header: Header;
	content: Content;
	likes_count: number;
	is_liked: boolean;
}

export const toCommentConfig = (
	commentResponse: CommentResponse,
): CommentConfig => {
	return {
		id: commentResponse.id,
		communityId: commentResponse.header.community_id,
		key: `comment-${commentResponse.id}`,
		authorId: commentResponse.header.author_id,
		avatar: parseImage(commentResponse.header.avatar),
		authorName: commentResponse.header.author,
		createdAt: parseTime(commentResponse.content.created_at),
		text: commentResponse.content.text,
	};
};

export interface CommentPayload {
	text: string;
	file: string;
}

import app from '../app';
import { CommentConfig } from '../components/Comment/Comment';
import { ROOT } from '../config';
import parseFile from '../modules/parseFile';
import parseTime from '../modules/parseTime';

export interface Header {
	author_id: number;
	author: string;
	avatar: string;
	community_id: number;
}

interface Content {
	text: string;
	file: string[];
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
	const userId = app.stores.home.state.main.header.profile.id;
	const hasEditButton = userId === commentResponse.header.author_id;
	const hasDeleteButton = hasEditButton;
	const files = commentResponse.content.file || [];
	return {
		id: commentResponse.id,
		communityId: commentResponse.header.community_id,
		key: `comment-${commentResponse.id}`,
		authorId: commentResponse.header.author_id,
		avatar: parseFile(commentResponse.header.avatar),
		authorName: commentResponse.header.author,
		createdAt: parseTime(commentResponse.content.created_at),
		createdAtISO: commentResponse.content.created_at,
		text: commentResponse.content.text,
		hasEditButton,
		hasDeleteButton,
		files,
	};
};

export interface CommentPayload {
	text: string;
	file: string[];
}

export const commentPayloadToResponse = (
	config: CommentConfig,
	payload: CommentPayload,
): CommentResponse => {
	return {
		id: config.id,
		header: {
			author_id: config.authorId,
			author: config.authorName,
			community_id: config.communityId,
			avatar: config.avatar.slice(ROOT.length),
		},
		content: {
			text: payload.text,
			file: payload.file,
			created_at: config.createdAtISO,
			updated_at: new Date().toISOString(),
		},
		likes_count: 0,
		is_liked: false,
	};
};

import { PostConfig, SortOptions } from '../components';
import { GroupPageConfig } from '../components/GroupPage/GroupPage';
import { ATTACHMENT_COUNT_LIMIT, PAGE_URLS } from '../config';
import parseFile from '../modules/parseFile';
import parseTime from '../modules/parseTime';
import { ErrorMessages } from './errorMessages';

export const POST_ERRORS_MAP: ErrorMessages = {
	'content is bad': 'Введены некорректные данные',
};

export interface Header {
	author_id: number;
	author: string;
	avatar: string;
	community_id?: string;
}

interface PostContent {
	text: string;
	file: string[];
	created_at: string;
}

export interface PostResponse {
	id: number;
	header: Header;
	post_content: PostContent;
	likes_count: number;
	is_liked: boolean;
	comment_count: number;
}

export const toPostConfig = (postResponse: PostResponse): PostConfig => {
	const authorHref = postResponse.header.community_id
		? `${PAGE_URLS.groupPage}/${postResponse.header.community_id}`
		: `${PAGE_URLS.profile}/${postResponse.header.author_id}`;
	return {
		id: postResponse.id,
		key: `post-${postResponse.id}`,
		avatar: parseFile(postResponse.header.avatar),
		title: postResponse.header.author,
		text: postResponse.post_content.text,
		files: postResponse.post_content.file || [],
		date: parseTime(postResponse.post_content.created_at),
		hasDeleteButton: false,
		hasEditButton: false,
		likes: postResponse.likes_count,
		likedByUser: postResponse.is_liked,
		authorHref,
		commentsCount: postResponse.comment_count,
		commentsConfigs: [],
		commentsOpen: false,
		commentEditId: 0,
		commentsSort: SortOptions.Asc,
		commentAttachmentInput: {
			key: 'commentAttachmentInput',
			files: [],
			filesCountLimit: ATTACHMENT_COUNT_LIMIT.comment,
			name: 'files[]',
			type: 'file',
			extra: 'multiple',
			hidden: true,
		},
		expanded: false,
	};
};

export const groupPostResponseToPostConfig = (
	groupPageConfig: GroupPageConfig,
	postResponse: PostResponse,
): PostConfig => {
	const postConfig = toPostConfig(postResponse);
	if (groupPageConfig.isAdmin) {
		postConfig.hasEditButton = true;
		postConfig.hasDeleteButton = true;
	}
	return postConfig;
};

export interface PostPayload {
	post_content: {
		text: string;
		file: string[];
	};
}

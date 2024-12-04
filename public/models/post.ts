import { PostConfig } from '../components';
import { GroupPageConfig } from '../components/GroupPage/GroupPage';
import { PAGE_URLS } from '../config';
import parseImage from '../modules/parseImage';
import parseTime from '../modules/parseTime';

interface Header {
	author_id: number;
	author: string;
	avatar: string;
	community_id?: string;
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
	likes_count: number;
	is_liked: boolean;
}

export const toPostConfig = (postResponse: PostResponse): PostConfig => {
	const authorHref = postResponse.header.community_id
		? `${PAGE_URLS.groupPage}/${postResponse.header.community_id}`
		: `${PAGE_URLS.profile}/${postResponse.header.author_id}`;
	return {
		id: postResponse.id,
		key: `post-${postResponse.id}`,
		avatar: parseImage(postResponse.header.avatar),
		title: postResponse.header.author,
		text: postResponse.post_content.text,
		img: parseImage(postResponse.post_content.file),
		date: parseTime(postResponse.post_content.created_at),
		hasDeleteButton: false,
		hasEditButton: false,
		likes: postResponse.likes_count,
		likedByUser: postResponse.is_liked,
		authorHref,
		commentsConfigs: [],
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
		file: string;
	};
}

import { GroupConfig } from '../components/Group/Group';
import { GroupPageConfig } from '../components/GroupPage/GroupPage';
import { SearchResultConfig } from '../components/SearchResult/SearchResult';
import { PAGE_LINKS, PAGE_URLS } from '../config';

export interface ShortGroupResponse {
	id: number;
	name: string;
	avatar: string;
	about: string;
	// isAuthor: boolean; //
	is_followed?: boolean; //
}

export interface FullGroupResponse extends ShortGroupResponse {
	count_subscribers: number;
	is_admin?: boolean;
	// posts?: PostResponse[]; //
}

export const toGroupPageConfig = (
	config: GroupPageConfig,
	groupResponse: FullGroupResponse,
): GroupPageConfig => {
	const isAdmin = groupResponse.is_admin ? groupResponse.is_admin : false;
	const isFollow = groupResponse.is_followed
		? groupResponse.is_followed
		: false;
	const groupPageData: GroupPageConfig = {
		id: groupResponse.id,
		key: `groupPage-${groupResponse.id}`,
		name: groupResponse.name,
		description: groupResponse.about,
		img: groupResponse.avatar,
		// posts: groupResponse.posts
		// 	? groupResponse.posts.map((postResponse) =>
		// 			toPostConfig(postResponse),
		// 		)
		// 	: [],
		countSubscribers: groupResponse.count_subscribers,
		posts: [],
		createPostHref: PAGE_LINKS.createPost,
		isAdmin: isAdmin,
		isFollow: isFollow,
	};
	if (groupPageData.isAdmin) {
		groupPageData.posts.forEach((post) => {
			post.hasDeleteButton = true;
			post.hasEditButton = true;
		});
	}
	return groupPageData;
};

export const toGroupsConfig = (
	groupResponse: ShortGroupResponse,
): GroupConfig => {
	const isFollow = groupResponse.is_followed
		? groupResponse.is_followed
		: false;
	const newConfig: GroupConfig = {
		id: groupResponse.id,
		key: `group-${groupResponse.id}`,
		avatar: groupResponse.avatar,
		name: groupResponse.name,
		description: groupResponse.about,
		isFollow: isFollow,
		href: PAGE_URLS.groups + `/${groupResponse.id}`,
	};
	return newConfig;
};

export const shortGroupResponseToSearchResultConfig = (
	groupResponse: ShortGroupResponse,
): SearchResultConfig => {
	return {
		id: groupResponse.id,
		key: `group-${groupResponse.id}`,
		avatar: groupResponse.avatar,
		name: groupResponse.name,
		description: groupResponse.about,
	};
};

export interface GroupPayload {
	name: string;
	about: string;
	avatar: string;
}

import { GroupConfig } from '../components/Group/Group';
import { GroupPageConfig } from '../components/GroupPage/GroupPage';
import { SearchResultConfig } from '../components/SearchResult/SearchResult';
import { PAGE_LINKS } from '../config';

export interface ShortGroupResponse {
	id: number;
	name: string;
	avatar: string;
	about: string;
	// isAuthor: boolean; //
	isFollow?: boolean; //
}

export interface FullGroupResponse extends ShortGroupResponse {
	countSubscribers: number;
	isAdmin?: boolean;
	// posts?: PostResponse[]; //
}

export const toGroupPageConfig = (
	config: GroupPageConfig,
	groupResponse: FullGroupResponse,
): GroupPageConfig => {
	const isAdmin = groupResponse.isAdmin ? groupResponse.isAdmin: false;
	const isFollow = groupResponse.isFollow ? groupResponse.isFollow: false;
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
	return Object.assign(config, groupPageData);
};

export const toGroupsConfig = (
	groupResponse: ShortGroupResponse,
): GroupConfig => {
	const isFollow = groupResponse.isFollow ? groupResponse.isFollow: false;
	const newConfig: GroupConfig = {
		id: groupResponse.id,
		key: `group-${groupResponse.id}`,
		avatar: groupResponse.avatar,
		name: groupResponse.name,
		description: groupResponse.about,
		isFollow: isFollow,
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

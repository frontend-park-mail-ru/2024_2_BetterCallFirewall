import { GroupConfig } from '../components/Group/Group';
import { GroupPageConfig } from '../components/GroupPage/GroupPage';
import { PAGE_LINKS } from '../config';

export interface ShortGroupResponse {
	id: number;
	name: string;
	avatar: string;
	about: string;
	// isAuthor: boolean; //
	// isFollow: boolean; //
}

export interface FullGroupResponse extends ShortGroupResponse {
	countSubscribers: number;
	isAdmin: boolean;
	// posts?: PostResponse[]; //
}

export const toGroupPageConfig = (
	config: GroupPageConfig,
	groupResponse: FullGroupResponse,
): GroupPageConfig => {
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
		// isAuthor: groupResponse.isAuthor,
        isAdmin: groupResponse.isAdmin,
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
	const newConfig: GroupConfig = {
		id: groupResponse.id,
		key: `group-${groupResponse.id}`,
		avatar: groupResponse.avatar,
		name: groupResponse.name,
		description: groupResponse.about,
		// isFollow: groupResponse.isFollow,
        isFollow: false, //
	};
	return newConfig;
};

export interface GroupPayload {
	name: string;
	about: string;
	avatar: string;
}

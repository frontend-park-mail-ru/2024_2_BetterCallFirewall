import { GroupConfig } from '../components/Group/Group';
import { GroupPageConfig } from '../components/GroupPage/GroupPage';
import { PAGE_LINKS } from '../config';
import { PostResponse, toPostConfig } from './post';

export interface ShortGroupResponse {
	id: number;
	name: string;
	avatar: string;
	about: string;
    isAuthor: boolean; //
    isFollow: boolean; //
}

export interface FullGroupResponse extends ShortGroupResponse {
	countSubscribers: number;
	posts?: PostResponse[]; //
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
        posts: groupResponse.posts
            ? groupResponse.posts.map((postResponse) =>
                toPostConfig(postResponse),
                )
            : [],
        createPostHref: PAGE_LINKS.createPost,
        isAuthor: groupResponse.isAuthor,
    };
    if (groupPageData.isAuthor) {
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
        isFollow: groupResponse.isFollow,
	};
	return newConfig;
};
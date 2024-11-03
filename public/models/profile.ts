import { IFriendConfig } from '../components/Friend/Friend';
import { IProfileConfig } from '../components/Profile/Profile';
import { PAGE_LINKS } from '../config';
import parseImage from '../modules/parseImage';
import { PostResponse, toPostConfig } from './post';

export interface ShortProfileResponse {
	id: number;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface FullProfileResponse extends ShortProfileResponse {
	bio: string;
	pics?: string[];
	posts?: PostResponse[];
}

export const toProfileConfig = (
	config: IProfileConfig,
	profileResponse: FullProfileResponse,
): IProfileConfig => {
	const profileData: IProfileConfig = {
		id: profileResponse.id,
		key: `profile-${profileResponse.id}`,
		firstName: profileResponse.first_name,
		secondName: profileResponse.last_name,
		img: parseImage(profileResponse.avatar),
		description: profileResponse.bio,
		posts: profileResponse.posts?.map((postResponse) =>
			toPostConfig(postResponse),
		),
		createPostHref: PAGE_LINKS.createPost,
	};
	return Object.assign(config, profileData);
};

export const toFriendConfig = (
	profileResponse: ShortProfileResponse,
): IFriendConfig => {
	const newConfig: IFriendConfig = {
		id: profileResponse.id,
		key: `friend-${profileResponse.id}`,
		name: `${profileResponse.first_name} ${profileResponse.last_name}`,
		avatar: parseImage(profileResponse.avatar),
	};
	return newConfig;
};

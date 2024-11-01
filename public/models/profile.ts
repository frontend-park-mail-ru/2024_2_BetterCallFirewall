import { IProfileConfig } from '../components/Profile/Profile';
import { PostResponse, toPostConfig } from './post';

export interface ShortProfileResponse {
	id: number;
	firstName: string;
	lastName: string;
	avatar: string;
}

export interface FullProfileResponse extends ShortProfileResponse {
	bio: string;
	pics: string[];
	posts: PostResponse[];
}

export const toProfileConfig = (
	config: IProfileConfig,
	profileResponse: FullProfileResponse,
): IProfileConfig => {
	const profileData: IProfileConfig = {
		id: profileResponse.id,
		key: `profile-${profileResponse.id}`,
		firstName: profileResponse.firstName,
		secondName: profileResponse.lastName,
		img: profileResponse.avatar,
		description: profileResponse.bio,
		posts: profileResponse.posts.map((postResponse) =>
			toPostConfig(postResponse),
		),
	};
	return Object.assign(config, profileData);
};

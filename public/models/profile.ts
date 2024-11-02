import { IProfileConfig } from '../components/Profile/Profile';
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
		img: profileResponse.avatar,
		description: profileResponse.bio,
		posts: profileResponse.posts?.map((postResponse) =>
			toPostConfig(postResponse),
		),
	};
	return Object.assign(config, profileData);
};

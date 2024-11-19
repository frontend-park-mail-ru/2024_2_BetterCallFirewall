import { IChatConfig } from '../components/Chat/Chat';
import { FriendConfig } from '../components/Friend/Friend';
import { ProfileConfig } from '../components/Profile/Profile';
import { PAGE_LINKS } from '../config';
import deepClone from '../modules/deepClone';
import parseImage from '../modules/parseImage';
import { PostResponse, toPostConfig } from './post';

export interface ShortProfileResponse {
	id: number;
	first_name: string;
	last_name: string;
	avatar: string;
	is_author: boolean;
	is_friend: boolean;
	is_subscriber: boolean;
	is_subscription: boolean;
}

export interface FullProfileResponse extends ShortProfileResponse {
	bio: string;
	pics?: string[];
	posts?: PostResponse[];
}

export const toProfileConfig = (
	config: ProfileConfig,
	profileResponse: FullProfileResponse,
): ProfileConfig => {
	const profileData: ProfileConfig = {
		id: profileResponse.id,
		key: `profile-${profileResponse.id}`,
		firstName: profileResponse.first_name,
		secondName: profileResponse.last_name,
		img: parseImage(profileResponse.avatar),
		description: profileResponse.bio,
		posts: profileResponse.posts
			? profileResponse.posts.map((postResponse) =>
					toPostConfig(postResponse),
				)
			: [],
		createPostHref: PAGE_LINKS.createPost,
		isAuthor: profileResponse.is_author,
		isFriend: profileResponse.is_friend,
		isSubscriber: profileResponse.is_subscriber,
		isSubscription: profileResponse.is_subscription,
	};
	if (profileData.isAuthor) {
		profileData.posts?.forEach((post) => {
			post.hasDeleteButton = true;
			post.hasEditButton = true;
		});
	}
	return Object.assign(config, profileData);
};

export const toFriendConfig = (
	profileResponse: ShortProfileResponse,
): FriendConfig => {
	const newConfig: FriendConfig = {
		id: profileResponse.id,
		key: `friend-${profileResponse.id}`,
		name: `${profileResponse.first_name} ${profileResponse.last_name}`,
		avatar: parseImage(profileResponse.avatar),
		isFriend: profileResponse.is_friend,
		isSubscriber: profileResponse.is_subscriber,
		isSubscription: profileResponse.is_subscription,
	};
	return newConfig;
};

export const toChatConfig = (
	chatConfig: IChatConfig,
	response: FullProfileResponse,
): IChatConfig => {
	const newChatConfig = deepClone(chatConfig);
	newChatConfig.companionId = response.id;
	newChatConfig.companionName = `${response.first_name} ${response.last_name}`;
	newChatConfig.companionAvatar = parseImage(response.avatar);
	return newChatConfig;
};

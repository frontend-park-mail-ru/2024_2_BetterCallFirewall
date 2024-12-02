import { HeaderProfile } from '../components';
import { ChatConfig } from '../components/Chat/Chat';
import { FriendConfig } from '../components/Friend/Friend';
import { ProfileConfig } from '../components/Profile/Profile';
import { SearchResultConfig } from '../components/SearchResult/SearchResult';
import { PAGE_LINKS, PAGE_URLS } from '../config';
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
	const isUnknown =
		!profileResponse.is_author &&
		!profileResponse.is_friend &&
		!profileResponse.is_subscriber &&
		!profileResponse.is_subscription;
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
		editProfileHref: PAGE_URLS.profileEdit,
		isAuthor: profileResponse.is_author,
		isFriend: profileResponse.is_friend,
		isSubscriber: profileResponse.is_subscriber,
		isSubscription: profileResponse.is_subscription,
		isUnknown,
	};
	if (profileData.isAuthor) {
		profileData.posts.forEach((post) => {
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
	chatConfig: ChatConfig,
	response: FullProfileResponse,
): ChatConfig => {
	const newChatConfig = deepClone(chatConfig);
	newChatConfig.companionId = response.id;
	newChatConfig.companionName = `${response.first_name} ${response.last_name}`;
	newChatConfig.companionAvatar = parseImage(response.avatar);
	return newChatConfig;
};

export const toHeaderProfile = (
	profileResponse: ShortProfileResponse,
): HeaderProfile => {
	return {
		id: profileResponse.id,
		name: `${profileResponse.first_name} ${profileResponse.last_name}`,
		avatar: parseImage(profileResponse.avatar),
	};
};

export const shortProfileResponseToSearchResultConfig = (
	respone: ShortProfileResponse,
): SearchResultConfig => {
	return {
		id: respone.id,
		key: `search-result-${respone.id}`,
		avatar: parseImage(respone.avatar),
		name: `${respone.first_name} ${respone.last_name}`,
	};
};

export interface ProfilePayload {
	first_name: string;
	last_name: string;
	bio: string;
	avatar: string;
}

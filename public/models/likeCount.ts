import { PostConfig } from '../components';

export interface LikeCountResponse {
	count: number;
	isLiked: boolean;
}

export const likeCountResponseToPostConfig = (
	postConfig: PostConfig,
	likeCountResponse: LikeCountResponse,
): PostConfig => {
	return {
		...postConfig,
		likes: likeCountResponse.count,
		likedByUser: likeCountResponse.isLiked,
	};
};

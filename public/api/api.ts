import { Action } from '../actions/action';
import { ActionAppInit } from '../actions/actionApp';
import {
	ACTION_CHAT_TYPES,
	ActionChatRequestData,
	ActionChatRequestFail,
	ActionChatRequestSuccess,
} from '../actions/actionChat';
import {
	ActionCsatMetrics,
	ActionCsatSendSuccess,
} from '../actions/actionCsat';
import {
	ACTION_FEED_TYPES,
	ActionFeedPostCreateFail,
	ActionFeedPostCreateSuccess,
	ActionFeedPostsRequestData,
	ActionPostsRequestFail,
	ActionPostsRequestSuccess,
} from '../actions/actionFeed';
import {
	ACTION_FRIENDS_TYPES,
	ActionFriendsAcceptData,
	actionFriendsAcceptFail,
	ActionFriendsAcceptSuccess,
	actionFriendsRemoveFail,
	ActionFriendsRemoveSuccess,
	ActionFriendsSubscribeFail,
	ActionFriendsSubscribeSuccess,
	actionFriendsUnsubscribeFail,
	ActionFriendsUnsubscribeSuccess,
	ActionFriendsGetFriendsSuccess,
	ActionFriendsGetSubscribersSuccess,
	ActionFriendsGetSubscriptionsSuccess,
	ActionFriendsGetUsersSuccess,
} from '../actions/actionFriends';
import { ActionMenuUpdateProfileLinkHref } from '../actions/actionMenu';
import {
	ACTION_MESSAGES_TYPES,
	ActionMessagesRequestFail as ActionMessagesRequestFail,
	ActionMessagesRequestSuccess,
} from '../actions/actionMessages';
import {
	ACTION_POST_TYPES,
	ActionPostLikeData,
	ActionPostLikeFail,
	ActionPostLikeSuccess,
} from '../actions/actionPost';
import {
	ActionPostEditRequestFail,
	ActionPostEditRequestSuccess,
} from '../actions/actionPostEdit';
import {
	ActionProfileGetHeaderFail,
	ActionProfileGetHeaderSuccess,
	ActionProfileGetYourOwnProfileFail,
	ActionProfileGetYourOwnProfileSuccess,
	ActionProfileRequestFail,
	ActionProfileRequestSuccess,
	ActionProfileDeletePostFail,
	ActionProfileDeletePostSuccess,
	ACTION_PROFILE_TYPES,
	ActionProfileRequestData,
	ActionProfileSearchFail,
	ActionProfileSearchSuccess,
	ActionProfileSearchData,
} from '../actions/actionProfile';
import {
	ActionProfileEditRequestFail,
	ActionProfileEditRequestSuccess,
} from '../actions/actionProfileEdit';
import {
	ACTION_USER_TYPES,
	ActionUserUnauthorized,
} from '../actions/actionUser';
import app from '../app';
import dispatcher from '../dispatcher/dispatcher';
import { GroupPayload } from '../models/group';
import { PostPayload } from '../models/post';
import ajax, { QueryParams } from '../modules/ajax';

export const STATUS = {
	ok: 200,
	noMoreContent: 204,
	badRequest: 400,
	unauthorized: 401,
	wrongMethod: 405,
	internalServerError: 500,
};

class API {
	handleAction(action: Action) {
		switch (action.type) {
			case ACTION_FEED_TYPES.postsRequest:
				this.requestPosts(
					(action.data as ActionFeedPostsRequestData).lastId,
				);
				break;
			case ACTION_USER_TYPES.auth:
			case ACTION_PROFILE_TYPES.getHeader:
				this.requestHeader();
				break;
			case ACTION_FRIENDS_TYPES.accept:
				this.acceptFriend((action.data as ActionFriendsAcceptData).id);
				break;
			case ACTION_PROFILE_TYPES.profileRequest:
				this.requestProfile(
					(action.data as ActionProfileRequestData).href,
				);
				break;
			case ACTION_MESSAGES_TYPES.requestMessages:
				this.getMessages();
				break;
			case ACTION_CHAT_TYPES.requestChat: {
				const actionData = action.data as ActionChatRequestData;
				this.getChatMessages(actionData.id, actionData.lastTime);
				break;
			}
			case ACTION_PROFILE_TYPES.getYourOwnProfile:
				this.requestYourOwnProfile();
				break;
			case ACTION_POST_TYPES.like:
				this.likePost((action.data as ActionPostLikeData).postId);
				break;
			case ACTION_PROFILE_TYPES.search: {
				const actionData = action.data as ActionProfileSearchData;
				this.profileSearch(actionData.str, actionData.userId);
				break;
			}
			case ACTION_POST_TYPES.unlike:
				this.unlikePost((action.data as ActionPostLikeData).postId);
				break;
		}
	}

	sendAction(action: Action) {
		dispatcher.getAction(action);
	}

	async requestProfile(href: string) {
		const response = await ajax.getProfile(href);
		switch (response.status) {
			case STATUS.unauthorized:
				this.sendAction(new ActionUserUnauthorized());
				break;
			case STATUS.badRequest:
			case STATUS.wrongMethod:
				this.sendAction(
					new ActionProfileRequestFail({ status: response.status }),
				);
				break;
			case STATUS.ok:
				if (!response.data) {
					this.sendAction(
						new ActionProfileRequestFail({
							status: response.status,
							message: 'empty data',
						}),
					);
					return;
				}
				this.sendAction(
					new ActionProfileRequestSuccess({
						profileResponse: response.data,
					}),
				);
				break;
		}
	}

	async requestYourOwnProfile() {
		const response = await ajax.getYourOwnProfile();
		switch (response.status) {
			case STATUS.unauthorized:
				this.sendAction(new ActionUserUnauthorized());
				break;
			case STATUS.badRequest:
			case STATUS.wrongMethod:
				this.sendAction(
					new ActionProfileGetYourOwnProfileFail({
						status: response.status,
					}),
				);
				break;
			case STATUS.ok:
				if (!response.data) {
					this.sendAction(
						new ActionProfileGetYourOwnProfileFail({
							status: response.status,
							message: 'empty body',
						}),
					);
					return;
				}
				this.sendAction(
					new ActionProfileGetYourOwnProfileSuccess({
						profile: response.data,
					}),
				);
		}
		if (!app.inited) {
			this.sendAction(new ActionAppInit());
		}
	}

	async requestPosts(lastPostId?: number): Promise<void> {
		const params: QueryParams = {};
		if (lastPostId) {
			params.id = `${lastPostId}`;
		}
		const response = await ajax.getPosts(params);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					break;
				}
				this.sendAction(new ActionPostsRequestSuccess(response.data));
				break;
			case STATUS.unauthorized:
				this.sendAction(new ActionUserUnauthorized());
				this.sendAction(
					new ActionPostsRequestFail({
						status: response.status,
					}),
				);
				break;
			case STATUS.noMoreContent:
				this.sendAction(
					new ActionPostsRequestFail({
						status: response.status,
						message: response.message,
					}),
				);
		}
	}

	async requestHeader(): Promise<void> {
		const response = await ajax.getHeader();
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					break;
				}
				this.sendAction(
					new ActionProfileGetHeaderSuccess({
						headerResponse: response.data,
					}),
				);
				this.sendAction(
					new ActionMenuUpdateProfileLinkHref(
						`/${response.data.author_id}`,
					),
				);
				break;
			case STATUS.unauthorized:
				this.sendAction(new ActionUserUnauthorized());
				this.sendAction(
					new ActionProfileGetHeaderFail({ status: response.status }),
				);
				break;
			case STATUS.badRequest:
				this.sendAction(
					new ActionProfileGetHeaderFail({ status: response.status }),
				);
				break;
		}
		if (!app.inited) {
			this.sendAction(new ActionAppInit());
		}
	}

	async requestFriends(profileId: number) {
		const response = await ajax.getFriends(profileId);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					break;
				}
				this.sendAction(
					new ActionFriendsGetFriendsSuccess({
						friends: response.data,
					}),
				);
				break;
			case STATUS.noMoreContent:
				this.sendAction(
					new ActionFriendsGetFriendsSuccess({ friends: [] }),
				);
				break;
		}
	}

	async requestSubscribers(profileId: number) {
		const response = await ajax.getSubscribers(profileId);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					break;
				}
				this.sendAction(
					new ActionFriendsGetSubscribersSuccess({
						subscribers: response.data,
					}),
				);
				break;
			case STATUS.noMoreContent:
				this.sendAction(
					new ActionFriendsGetSubscribersSuccess({ subscribers: [] }),
				);
				break;
		}
	}

	async requestUsers(lastId?: number) {
		const response = await ajax.getProfiles(lastId);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					break;
				}
				this.sendAction(
					new ActionFriendsGetUsersSuccess({
						users: response.data,
					}),
				);
		}
	}

	async requestSubscriptions(profileId: number) {
		const response = await ajax.getProfileSubscriptions(profileId);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					break;
				}
				this.sendAction(
					new ActionFriendsGetSubscriptionsSuccess({
						subscriptions: response.data,
					}),
				);
				break;
			case STATUS.noMoreContent:
				this.sendAction(
					new ActionFriendsGetSubscriptionsSuccess({
						subscriptions: [],
					}),
				);
				break;
		}
	}

	async subscribeToProfile(profileId: number) {
		const response = await ajax.subscribeToProfile(profileId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionFriendsSubscribeSuccess());
				break;
			default:
				this.sendAction(new ActionFriendsSubscribeFail());
		}
	}

	async unsubscribeToProfile(profileId: number) {
		const response = await ajax.unsubscribeFromProfile(profileId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionFriendsUnsubscribeSuccess());
				break;
			default:
				this.sendAction(new actionFriendsUnsubscribeFail());
		}
	}

	async acceptFriend(profileId: number) {
		const response = await ajax.acceptFriend(profileId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionFriendsAcceptSuccess());
				break;
			default:
				this.sendAction(new actionFriendsAcceptFail());
		}
	}

	async removeFriend(profileId: number) {
		const response = await ajax.removeFriend(profileId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionFriendsRemoveSuccess());
				break;
			default:
				this.sendAction(new actionFriendsRemoveFail());
		}
	}

	async createGroup(formData: GroupPayload) {
		const response = await ajax.createGroup(formData);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					return;
				}
				// this.sendAction(
				// 	new ActionGroupsCreateGroupSuccess(),
				// );
				break;
			default:
				// this.sendAction();
		}
	}

	async getGroups() {
		const response = await ajax.getGroups();
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					// this.sendAction();
					break;
				}
			// this.sendAction(
			// 	new ActionGroupsGetGroupsSuccess({
			// 		groups: response.data,
			// 	}),
			// );
			break;
		}
	}

	async createPost(formData: PostPayload) {
		const response = await ajax.createPost(formData);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					return;
				}
				this.sendAction(
					new ActionFeedPostCreateSuccess({ post: response.data }),
				);
				break;
			default:
				this.sendAction(new ActionFeedPostCreateFail());
		}
	}

	async editPost(formData: PostPayload, postId: number) {
		const response = await ajax.editPost(formData, postId);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					return;
				}
				this.sendAction(
					new ActionPostEditRequestSuccess({
						postResponse: response.data,
					}),
				);
				break;
			default:
				this.sendAction(new ActionPostEditRequestFail());
		}
	}

	async deletePost(postId: number) {
		const response = await ajax.deletePost(postId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionProfileDeletePostSuccess());
				break;
			default:
				this.sendAction(new ActionProfileDeletePostFail());
		}
	}

	async editProfile(formData: FormData) {
		const response = await ajax.editProfile(formData);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					return;
				}
				this.sendAction(
					new ActionProfileEditRequestSuccess(response.data),
				);
				break;
			default:
				this.sendAction(new ActionProfileEditRequestFail());
		}
	}

	async getMessages() {
		const response = await ajax.getMessages();
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					this.sendAction(
						new ActionMessagesRequestFail(response.status),
					);
					break;
				}
				this.sendAction(
					new ActionMessagesRequestSuccess(response.data),
				);
				break;
			case STATUS.noMoreContent:
				this.sendAction(
					new ActionMessagesRequestFail(
						response.status,
						'Сообщений нет',
					),
				);
				break;
			default:
				this.sendAction(new ActionMessagesRequestFail(response.status));
		}
	}

	async getChatMessages(profileId: number, lastTime?: string) {
		const response = await ajax.getChatMessages(profileId, lastTime);
		switch (response.status) {
			case STATUS.ok:
				if (!response.data) {
					this.sendAction(new ActionChatRequestFail());
					break;
				}
				this.sendAction(new ActionChatRequestSuccess(response.data));
				break;
			default:
				this.sendAction(new ActionChatRequestFail());
		}
	}

	async likePost(postId: number) {
		const response = await ajax.likePost(postId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionPostLikeSuccess(postId));
				break;
			default:
				this.sendAction(new ActionPostLikeFail());
		}
	}

	async unlikePost(postId: number) {
		const response = await ajax.unlikePost(postId);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionPostLikeSuccess(postId));
				break;
			default:
				this.sendAction(new ActionPostLikeFail());
		}
	}

	async profileSearch(str: string, userId: number) {
		const response = await ajax.profilesSearch(str, userId);
		switch (response.status) {
			case STATUS.ok:
				if (response.data) {
					this.sendAction(
						new ActionProfileSearchSuccess(response.data),
					);
				} else {
					this.sendAction(new ActionProfileSearchFail());
				}
				break;
			default:
				this.sendAction(new ActionProfileSearchFail());
		}
	}

	async csatSend(inTotal: number, feed: number) {
		const response = await ajax.csatSend(inTotal, feed);
		switch (response.status) {
			case STATUS.ok:
				this.sendAction(new ActionCsatSendSuccess());
		}
	}

	async csatMetrics() {
		const response = await ajax.csatMetrics();
		switch (response.status) {
			case STATUS.ok:
				if (response.data) {
					this.sendAction(new ActionCsatMetrics(response.data));
				}
		}
	}

	async sendImage(image: File) {
		const response = await ajax.sendImage(image);
		return response.data;
	}
}

export default new API();

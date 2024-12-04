import { ActionAppGoTo } from '../../actions/actionApp';
import { ActionChatGoToChat } from '../../actions/actionChat';
import {
	ACTION_FRIENDS_TYPES,
	ActionFriendsAccept,
	ActionFriendsSubscribe,
	ActionFriendsUnsubscribe,
} from '../../actions/actionFriends';
import { ActionPostLike, ActionPostUnlike } from '../../actions/actionPost';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileDelete,
	ActionProfileRequest,
	ActionUpdateProfile,
} from '../../actions/actionProfile';
import { ActionUserUnauthorized } from '../../actions/actionUser';
import api from '../../api/api';
import app from '../../app';
import { Post, Root } from '../../components';
import { ProfileConfig, Profile } from '../../components/Profile/Profile';
import { PAGE_LINKS, PAGE_URLS } from '../../config';
import { throttle } from '../../modules/throttle';
import { update } from '../../modules/vdom';
import { ChangeProfile } from '../../stores/storeProfile';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsProfile = {
	profile?: Profile;
} & ComponentsHome;

export interface ViewProfileConfig extends HomeConfig {
	profile: ProfileConfig;
	path: string;
}

export class ViewProfile extends ViewHome {
	protected _configProfile: ViewProfileConfig;
	protected _components: ComponentsProfile = {};

	constructor(config: ViewProfileConfig, root: Root) {
		super(config, root);
		this._configProfile = config;
	}

	get config(): ViewProfileConfig {
		return this._configProfile;
	}

	get profile(): Profile {
		const profile = this._components.profile;
		if (!profile) {
			throw new Error('profile on ViewProfile does not exist');
		}
		return profile;
	}

	handleChange(change: ChangeProfile): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_PROFILE_TYPES.deletePostSuccess:
				this.updateViewProfile(change.data);
				this.sendAction(new ActionUpdateProfile());
				this.sendAction(new ActionProfileRequest(app.router.path));
				break;
			case ACTION_FRIENDS_TYPES.subscribeSuccess:
			case ACTION_FRIENDS_TYPES.unsubscribeSuccess:
				this.sendAction(
					new ActionProfileRequest(`/${this.profile.config.id}`),
				);
				break;
			case ACTION_PROFILE_TYPES.deleteSuccess:
				this.sendAction(new ActionUserUnauthorized());
				break;
			default:
				this.updateViewProfile(change.data);
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionUpdateProfile());
		this._requestProfile();
	}

	updateViewProfile(data: ViewProfileConfig): void {
		super.updateViewHome(data);
		this._configProfile = Object.assign(this._configProfile, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderProfile();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderProfile(): void {
		this._components.profile = new Profile(
			this._configProfile.profile,
			this.content,
		);
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this._addProfileHandlers();
	}

	private _addProfileHandlers() {
		if (this.profile.config.isAuthor) {
			this.profile.createPostLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(PAGE_LINKS.createPost));
				},
			});
			this.profile.profileEditLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(PAGE_LINKS.profileEdit));
				},
			});
			this.profile.deleteProfileButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionProfileDelete(this.profile.config.id),
					);
				},
			});
		}
		if (!this.profile.config.isAuthor) {
			this.profile.writeMessageLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionChatGoToChat({
							href: PAGE_URLS.chat + `/${this.profile.config.id}`,
						}),
					);
				},
			});
		}
		if (this.profile.config.isSubscriber) {
			this.profile.acceptFriendButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionFriendsAccept(this.profile.config.id),
					);
				},
			});
		}
		if (this.profile.config.isSubscription) {
			this.profile.unsubscribeButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionFriendsUnsubscribe(this.profile.config.id),
					);
				},
			});
		}
		if (this.profile.config.isUnknown) {
			this.profile.subscribeButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionFriendsSubscribe(this.profile.config.id),
					);
				},
			});
		}
		this.profile.posts.forEach((post) => this._addPostHandlers(post));
	}

	private _addPostHandlers(post: Post) {
		if (post.config.hasEditButton) {
			post.editButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionPostEditGoTo(post.config));
				},
			});
		}
		if (post.config.hasDeleteButton) {
			post.deleteButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					api.deletePost(post.config.id);
				},
			});
		}
		post.likeButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this._likePost(post);
			},
		});
	}

	private _likePost = throttle((post: Post) => {
		if (post.config.likedByUser) {
			this.sendAction(new ActionPostUnlike(post.config.id));
		} else {
			this.sendAction(new ActionPostLike(post.config.id));
		}
	}, 1000);

	private _requestProfile = throttle(() => {
		this.sendAction(new ActionProfileRequest(app.router.path));
	}, 1000);
}

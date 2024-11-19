import { ActionChatGoToChat } from '../../actions/actionChat';
import { ActionCreatePostGoTo } from '../../actions/actionCreatePost';
import { ACTION_FEED_TYPES } from '../../actions/actionFeed';
import {
	ACTION_FRIENDS_TYPES,
	ActionFriendsAccept,
} from '../../actions/actionFriends';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequest,
	ActionUpdateProfile,
} from '../../actions/actionProfile';
import {
	ACTION_PROFILE_EDIT_TYPES,
	ActionProfileEditGoTo,
} from '../../actions/actionProfileEdit';
import api from '../../api/api';
import app from '../../app';
import { Post, Root } from '../../components';
import { ProfileConfig, Profile } from '../../components/Profile/Profile';
import { PAGE_URLS } from '../../config';
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
			case ACTION_PROFILE_TYPES.updateProfile:
			case ACTION_FRIENDS_TYPES.acceptSuccess:
			case ACTION_FEED_TYPES.postCreateSuccess:
			case ACTION_PROFILE_EDIT_TYPES.requestSuccess:
			case ACTION_PROFILE_TYPES.profileRequestSuccess:
			case ACTION_PROFILE_TYPES.profileRequestFail:
				this.updateViewProfile(change.data);
				break;
			case ACTION_PROFILE_TYPES.deletePostSuccess:
				this.updateViewProfile(change.data);
				this.sendAction(new ActionUpdateProfile());
				this.sendAction(new ActionProfileRequest(app.router.path));
				break;
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionUpdateProfile());
		this.sendAction(new ActionProfileRequest(app.router.path));
	}

	updateViewProfile(data: ViewProfileConfig): void {
		super.updateViewHome(data);
		this._configProfile = Object.assign(this._configProfile, data);
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderProfile();

		const rootNode = this._root.node;
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
		const profile = this.profile;
		if (profile.config.isAuthor) {
			profile.createPostLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionCreatePostGoTo());
				},
			});
			profile.profileEditLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionProfileEditGoTo());
				},
			});
		}
		if (!profile.config.isAuthor) {
			profile.writeMessageLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					const config = profile.config;
					this.sendAction(
						new ActionChatGoToChat({
							href: PAGE_URLS.chat + `/${config.id}`,
						}),
					);
				},
			});
		}
		if (profile.config.isSubscriber) {
			profile.acceptFriendButtonVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionFriendsAccept(profile.config.id));
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
	}
}

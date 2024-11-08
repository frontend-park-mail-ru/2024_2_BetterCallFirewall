import { ActionChatGoToChat } from '../../actions/actionChat';
import { ActionCreatePostGoTo } from '../../actions/actionCreatePost';
import { ACTION_FEED_TYPES } from '../../actions/actionFeed';
import { ActionPostEditGoTo } from '../../actions/actionPostEdit';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequest,
	ActionUpdateProfile,
} from '../../actions/actionProfile';
import {
	ACTION_PROFILE_EDIT_TYPES,
	ActionProfileEditGoTo,
	ActionProfileEditUpdate,
} from '../../actions/actionProfileEdit';
import api from '../../api/api';
import app from '../../app';
import { Post, Root } from '../../components';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
import { PAGE_URLS } from '../../config';
import { ChangeProfile } from '../../stores/storeProfile';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsProfile = {
	profile?: Profile;
} & ComponentsHome;

export interface ViewProfileConfig extends HomeConfig {
	profile: IProfileConfig;
	path: string;
}

export interface IViewProfile extends IViewHome {
	handleChange(change: ChangeProfile): void;
}

export class ViewProfile extends ViewHome implements IViewProfile {
	protected _configProfile: ViewProfileConfig;
	protected _components: ComponentsProfile = {};

	constructor(config: ViewProfileConfig, root: Root) {
		super(config, root);
		this._configProfile = config;
	}

	get profile(): Profile {
		const profile = this._components.profile;
		if (!profile) {
			throw new Error('profile on ViewProfile does not exist');
		}
		return profile;
	}

	handleChange(change: ChangeProfile): void {
		console.log('ViewProfile: change:', change);
		super.handleChange(change);
		switch (change.type) {
			case ACTION_PROFILE_TYPES.getYourOwnProfile:
				api.requestYourOwnProfile();
				break;
			case ACTION_FEED_TYPES.postCreateSuccess:
				if (this.active) {
					this.updateViewProfile(change.data);
				}
				break;
			case ACTION_PROFILE_EDIT_TYPES.requestSuccess:
			case ACTION_PROFILE_TYPES.profileRequestSuccess:
			case ACTION_PROFILE_TYPES.profileRequestFail:
				this.sendAction(
					new ActionProfileEditUpdate({
						inputs: {
							firstName: change.data.profile.firstName,
							lastName: change.data.profile.secondName,
							description: change.data.profile.description,
						},
					}),
				);
				if (this.active) {
					this.updateViewProfile(change.data);
				}
				break;
			case ACTION_PROFILE_TYPES.deletePostSuccess:
				this.updateViewProfile(change.data);
				this.sendAction(
					new ActionUpdateProfile(this._configProfile.profile),
				);
				this.sendAction(new ActionProfileRequest(app.router.path));
				break;
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionUpdateProfile(this._configProfile.profile));
		this.sendAction(new ActionProfileRequest(app.router.path));
	}

	updateViewProfile(data: ViewProfileConfig): void {
		this._configProfile = data;
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderProfile();
	}

	protected _renderProfile(): void {
		const content = this.content;
		const profile = new Profile(this._configProfile.profile, content);
		profile.render();
		this._components.profile = profile;

		this._addProfileHandlers();
	}

	private _addProfileHandlers() {
		const profile = this.profile;
		if (profile.config.isAuthor) {
			const createPostLink = this.profile.createPostLink;
			this.content.addHandler(createPostLink, 'click', (event) => {
				event.preventDefault();
				this.sendAction(new ActionCreatePostGoTo());
			});
			const profileEditLink = this.profile.profileEditLink;
			this.content.addHandler(profileEditLink, 'click', (event) => {
				event.preventDefault();
				this.sendAction(new ActionProfileEditGoTo());
			});
		}

		if (!profile.config.isAuthor) {
			profile.addHandler(profile.writeMessageLink, 'click', (event) => {
				event.preventDefault();
				const config = profile.config;
				this.sendAction(
					new ActionChatGoToChat({
						href: PAGE_URLS + `/${config.id}`,
					}),
				);
			});
		}

		this.profile.posts.forEach((post) => this._addPostHandlers(post));
	}

	private _addPostHandlers(post: Post) {
		if (post.config.hasEditButton) {
			post.addHandler(post.editButton, 'click', (event) => {
				event.preventDefault();
				this.sendAction(new ActionPostEditGoTo(post.config));
			});
		}
		if (post.config.hasDeleteButton) {
			post.addHandler(post.deleteButton, 'click', (event) => {
				event.preventDefault();
				api.deletePost(post.config.id);
			});
		}
	}
}

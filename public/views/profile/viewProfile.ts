import { ActionAppInit } from '../../actions/actionApp';
import { ActionUpdateProfileLinkHref } from '../../actions/actionMenu';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileFail,
	ActionProfileGetYourOwnProfileSuccess,
	ActionProfileRequestFail,
	ActionProfileRequestSuccess,
	ActionUpdateProfile,
} from '../../actions/actionProfile';
import { ActionUserUnauthorized } from '../../actions/actionUser';
import app from '../../app';
import { Post, Root } from '../../components';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
import ajax from '../../modules/ajax';
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
				this._requestYourOwnProfile();
				break;
			case ACTION_PROFILE_TYPES.profileRequestSuccess:
			case ACTION_PROFILE_TYPES.profileRequestFail:
				if (this.active) {
					this.updateViewProfile(change.data);
				}
				break;
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionUpdateProfile(this._configProfile.profile));
		this._requestProfile();
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
		// this._configProfile.profile = {
		// 	key: 'profile',
		// 	id: 2,
		// 	firstName: 'Luke',
		// 	secondName: 'Skywalker',
		// 	description: 'Jedi, master',
		// 	friendsCount: 99,
		// 	groupsCount: 3,
		// 	img: '../img/avatar.png',
		// }; // tmp

		const content = this.content;
		const profile = new Profile(this._configProfile.profile, content);
		profile.render();
		this._components.profile = profile;

		this._addProfileHandlers(this._configProfile.profile);
		// this._renderPosts();
	}

	private _renderPosts() {
		const postsContainer = this.profile.postsContainer;
		// Тестовые посты
		let counter = 0;
		for (let i = 0; i < 10; i++) {
			const post = new Post(
				{
					key: (counter++).toString(),
					id: 1,
					title: 'Header1',
					text: 'Text',
					date: '01.01.2024',
					avatar: '../../img/avatar.png',
				},
				this.profile,
			);
			post.render(false);
			postsContainer.appendChild(post.htmlElement);
		}
	}

	private async _requestProfile() {
		const response = await ajax.getProfile(this._profileLinkHref);
		switch (response.status) {
			case 401:
				this.sendAction(new ActionUserUnauthorized());
				break;
			case 400:
			case 405:
				this.sendAction(
					new ActionProfileRequestFail({ status: response.status }),
				);
				break;
			case 200:
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

	private async _requestYourOwnProfile() {
		const response = await ajax.getYourOwnProfile();
		switch (response.status) {
			case 401:
				this.sendAction(new ActionUserUnauthorized());
				break;
			case 400:
			case 405:
				this.sendAction(
					new ActionProfileGetYourOwnProfileFail({
						status: response.status,
					}),
				);
				break;
			case 200:
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
				this.sendAction(
					new ActionUpdateProfileLinkHref(`/${response.data.id}`),
				);
		}
		if (!app.inited) {
			this.sendAction(new ActionAppInit());
		}
	}

	private _addProfileHandlers(data: IProfileConfig) {
		if (!data.currentUser) {
			const profile = this._components.profile;
			if (!profile) {
				throw new Error(
					'component Profile does no exist on ViewProfile',
				);
			}
			profile.addSendFriendRequestButton();
		}
	}
}

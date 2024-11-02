import {
	ACTION_PROFILE_TYPES,
	ActionUpdateProfile,
} from '../../actions/actionProfile';
import api from '../../api/api';
import app from '../../app';
import { Root } from '../../components';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
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
			case ACTION_PROFILE_TYPES.profileRequestSuccess:
			case ACTION_PROFILE_TYPES.profileRequestFail:
			case ACTION_PROFILE_TYPES.getHeaderSuccess:
			case ACTION_PROFILE_TYPES.getHeaderFail:
				if (this.active) {
					this.updateViewProfile(change.data);
				}
				break;
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionUpdateProfile(this._configProfile.profile));
		api.requestProfile(app.router.path);
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

		this._addProfileHandlers(this._configProfile.profile);
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

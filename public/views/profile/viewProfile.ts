import { ActionUpdateProfile } from '../../actions/actionProfile';
import { Post, Root } from '../../components';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
import dispatcher from '../../dispatcher/dispatcher';
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

	handleChange(change: ChangeProfile): void {
		super.handleChange(change);
	}

	render(): void {
		super.render();
		dispatcher.getAction(
			new ActionUpdateProfile(this._configProfile.profile),
		);
	}

	updateViewProfile(data: ViewProfileConfig): void {
		this._configProfile = data;
		this.updateViewHome(data);
		this._renderProfile();
	}

	protected _render(): void {
		super._render();
		this._renderProfile();
	}

	protected _renderProfile(): void {
		this._configProfile.profile = {
			key: 'profile',
			id: 2,
			firstName: 'Luke',
			secondName: 'Skywalker',
			description: 'Jedi, master',
			friendsCount: 99,
			groupsCount: 3,
			img: '../img/avatar.png',
		}; // tmp

		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewProfile');
		}
		const profile = new Profile(this._configProfile.profile, content);
		profile.render();
		this._components.profile = profile;

		this._addProfileHandlers(this._configProfile.profile);

		console.log(
			'post here:',
			profile.htmlElement.querySelector('.profile__posts'),
		);
		const posts = profile.htmlElement.querySelector(
			'.profile__posts',
		) as HTMLElement;
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
				},
				profile,
			);
			post.render(false);
			posts.appendChild(post.htmlElement);
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

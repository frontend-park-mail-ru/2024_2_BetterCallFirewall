import { ACTION_PROFILE_TYPES } from '../../actions/actionProfile';
import { IHomeConfig } from '../../app';
import { Post, Root } from '../../components';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
import dispatcher from '../../dispatcher/dispatcher';
import { ComponentsHome, ViewHome } from '../home/viewHome';

export type ComponentsProfile = {
	profile?: Profile;
} & ComponentsHome;

export const updateProfileAction = (data: IProfileConfig) => {
	dispatcher.getAction({
		type: ACTION_PROFILE_TYPES.updateProfile,
		data,
	});
};

export interface ViewProfileConfig extends IHomeConfig {
	profile: IProfileConfig;
}

export class ViewProfile extends ViewHome {
	protected _components: ComponentsProfile = {};

	constructor(config: IHomeConfig, root: Root) {
		super(config, root);
	}

	setUser(user: string) {
		console.log('setUser');
		console.log('user:', user);
		const profileData = {
			key: 'profile',
			id: 2,
			firstName: 'Luke',
			secondName: 'Skywalker',
			description: 'Jedi, master',
			friendsCount: 99,
			groupsCount: 3,
			img: '../img/avatar.png',
		}; // temporary
		const currentUserId = 2;
		const currentUser = currentUserId === profileData.id;

		updateProfileAction({ ...profileData, currentUser });
	}

	updateViewProfile(data: ViewProfileConfig): void {
		this.updateViewHome({ main: data.main, menu: data.menu });
		this.updateProfile(data.profile);
	}

	updateProfile(data: IProfileConfig): void {
		let profile = this._components.profile;
		if (!profile) {
			const content = this._components.content;
			if (!content) {
				throw new Error('content does no exist on ViewProfile');
			}
			profile = new Profile(data, content);
			this._components.profile = profile;
		}
		profile.update(data);
		this._addProfileHandlers(data);
	}

	protected _renderContent(): void {
		super._renderContent();
		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewProfile');
		}
		const profile = new Profile({ key: 'profile' }, content); // конфиг хардкод
		profile.render();

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
				null,
			);
			profile.addChild(post);
			post.render(false);
			posts.appendChild(post.htmlElement);
			console.log(post.htmlElement);
			console.log(post);
		}
	}

	_addProfileHandlers(data: IProfileConfig) {
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

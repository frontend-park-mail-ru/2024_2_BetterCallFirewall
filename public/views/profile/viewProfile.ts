import { ActionUpdateProfile } from '../../actions/actionProfile';
import { Post, Root } from '../../components';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
import dispatcher from '../../dispatcher/dispatcher';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsProfile = {
	profile?: Profile;
} & ComponentsHome;

export interface ViewProfileConfig {
	home: HomeConfig;
	profile: IProfileConfig;
}

export class ViewProfile extends ViewHome {
	protected _configProfile: ViewProfileConfig;
	protected _components: ComponentsProfile = {};

	constructor(config: ViewProfileConfig, root: Root) {
		super(config.home, root);
		this._configProfile = config;
	}

	render(): void {
		super.render();
		dispatcher.getAction(
			new ActionUpdateProfile(this._configProfile.profile),
		);
	}

	updateViewProfile(data: ViewProfileConfig): void {
		data.profile = {
			key: 'profile',
			id: 2,
			firstName: 'Luke',
			// secondName: 'Skywalker',
			secondName: '<script>alert("XSS")</script>',
			// description: 'Jedi, master',
			description: '<img onerror=alert("XSS")></img>',
			friendsCount: 99,
			groupsCount: 3,
			img: '../img/avatar.png',
		}; // tmp
		this._configProfile = data;
		this.updateViewHome(data.home);
		this._renderProfile();
	}

	protected _rerender(): void {
		super._rerender();
		this._renderProfile();
	}

	protected _renderProfile(): void {
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
			// profile.addChild(post);
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

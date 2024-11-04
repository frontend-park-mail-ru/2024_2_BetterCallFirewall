import { PAGE_LINKS } from '../../config';
import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { IPostConfig, Post } from '../Post/Post';

type Posts = Post[];

export interface IProfileConfig extends IBaseComponentConfig {
	id: number;
	firstName?: string;
	secondName?: string;
	description?: string;
	friendsCount?: number;
	groupsCount?: number;
	img?: string;
	currentUser?: boolean;
	posts?: IPostConfig[];
	createPostHref: string;
	isAuthor: boolean;
	isFriend: boolean;
	isSubscriber: boolean;
	isSubscription: boolean;
}

export class Profile extends BaseComponent {
	protected override _config: IProfileConfig | null;
	private _posts: Posts = [];

	constructor(config: IProfileConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	get config(): IProfileConfig {
		if (this._config) {
			return this._config;
		}
		throw new Error('config not found');
	}

	set config(config: IProfileConfig) {
		this._config = config;
	}

	get postsContainer(): HTMLElement {
		const container = this.htmlElement.querySelector(
			'div.profile__posts',
		) as HTMLElement;
		if (!container) {
			throw new Error('.profile__posts not found');
		}
		return container;
	}

	get createPostLink(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'a.header__link',
		) as HTMLElement;
		if (!html) {
			throw new Error('createPostLink not found');
		}
		return html;
	}

	get profileEditLink(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'a.profile-edit',
		) as HTMLElement;
		if (!html) {
			throw new Error('profileEditLink not found');
		}
		return html;
	}

	get posts(): Post[] {
		return this._posts;
	}

	render(show: boolean = true): string {
		this._prerender();
		this._render('Profile.hbs', show);

		const postsItems = this._htmlElement?.querySelector(
			'.profile__posts',
		) as HTMLElement;
		if (postsItems) {
			this.config.posts?.forEach((config) => {
				const post = new Post(config, this);
				this._posts.push(post);
				post.render(false);
				post.appendToHTML(postsItems);
			});
		} else {
			throw new Error('profile has no .profile__posts');
		}

		return this.htmlElement.outerHTML;
	}

	remove(): void {
		super.remove();
		this._posts = [];
	}

	removeForUpdate(): void {
		super.removeForUpdate();
		this._posts = [];
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._config,
		};
	}

	addSendFriendRequestButton() {
		const friendButton = document.createElement('button');
		friendButton.classList.add('buton-action', 'button-no-decorations');
		friendButton.textContent = 'Добавить в друзья';
		this._htmlElement
			?.querySelector('.profile__actions')
			?.appendChild(friendButton);
	}

	addWriteMessageLink() {
		const writeMessageLink = document.createElement('a');
		writeMessageLink.href = '#';
		writeMessageLink.textContent = 'Написать сообщение';
		this._htmlElement
			?.querySelector('.profile__actions')
			?.appendChild(writeMessageLink);
	}

	addProfileEditLink() {
		const profileEditLink = document.createElement('a');
		profileEditLink.classList.add('profile-edit');
		profileEditLink.href = PAGE_LINKS.profileEdit;
		profileEditLink.textContent = 'Редактировать профиль';
		this._htmlElement
			?.querySelector('.profile__actions')
			?.appendChild(profileEditLink);
	}
}

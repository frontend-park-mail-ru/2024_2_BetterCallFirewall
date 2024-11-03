import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { IPost, IPostConfig, Post } from '../Post/Post';

type Posts = IPost[];

export interface IProfileConfig extends IBaseComponentConfig {
	id: number;
	firstName?: string;
	secondName?: string;
	description?: string;
	friendsCount?: number;
	groupsCount?: number;
	img?: string;
	currentUser?: boolean;
	isFriend?: boolean;
	posts?: IPostConfig[];
	createPostHref: string;
}

export class Profile extends BaseComponent {
	protected override _config: IProfileConfig | null;
	private posts: Posts = [];

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

	render(show: boolean = true): string {
		this._prerender();
		this._render('Profile.hbs', show);

		const postsItems = this._htmlElement?.querySelector(
			'.profile__posts',
		) as HTMLElement;
		if (postsItems) {
			this.config.posts?.forEach((config) => {
				const post = new Post(config, this);
				this.posts.push(post);
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
		this.posts = [];
	}

	removeForUpdate(): void {
		super.removeForUpdate();
		this.posts = [];
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
		friendButton.addEventListener('click', () => {});
		this._htmlElement
			?.querySelector('.profile__actions')
			?.appendChild(friendButton);
	}

	addWriteMessageLink() {
		const writeMessageLink = document.createElement('a');
		writeMessageLink.href = '#';
		writeMessageLink.textContent = 'Написать сообщение';
		writeMessageLink.addEventListener('click', () => {});
		this._htmlElement
			?.querySelector('.profile__actions')
			?.appendChild(writeMessageLink);
	}
}

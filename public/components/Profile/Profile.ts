import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { IPost } from '../Post/Post';

type Posts = IPost[];

export interface IProfileConfig extends IBaseComponentConfig {
    firstName?: string;
    secondName?: string;
    description?: string;
    friendsCount?: number;
    groupsCount?: number;
    img?: string;
}
// export interface IProfileConfig extends IBaseComponentConfig {}

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

	render(show: boolean = true): string {
		this._prerender();
		this._render('Profile.hbs', show);

		const postsItems = this._htmlElement?.querySelector(
			'.profile__posts',
		) as HTMLElement;
		if (postsItems) {
			this.posts.forEach((post) => {
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
}

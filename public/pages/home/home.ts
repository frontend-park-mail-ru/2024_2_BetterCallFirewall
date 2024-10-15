import { IMainConfig, PAGE_LINKS } from '../../app';
import {
	Container,
	Content,
	Header,
	IContent,
	Menu,
	Post,
} from '../../components/index';
import Ajax from '../../modules/ajax';
import BasePage, { IBasePage } from '../basePage';

type PostData = {
	header: string;
	body: string;
	created_at: string;
};

type PostResponse = {
	data: PostData[];
};

export const homePageTypes = {
	feed: 'feed',
};

export interface IHomePage extends IBasePage {
	clearContent(): void;
}

export default class HomePage extends BasePage {
	counter = 0; // Это временный костыль, пока с бэкенда не будет приходить id
	/**
	 *
	 * @param {string} pageType
	 */
	render(pageType: string): void {
		switch (pageType) {
			case homePageTypes.feed:
				this.#renderFeed();
				break;
			default:
				throw new Error('invalid page type');
		}
	}

	clear(): void {
		this.components.menu.remove();
		this.components.main.remove();
		this._components = {};
	}

	clearContent(): void {
		this.components.content.remove();
		delete this.components.content;
	}

	#renderFeed(): void {
		const mainConfig: IMainConfig = this.app.config.homeConfig.main;

		this.#renderMenu();

		const main = new Container(mainConfig, this.app.root);
		main.render();
		this.components.main = main;

		const header = new Header(mainConfig.header, main);
		header.render();
		this.components.header = header;

		const content = new Content(mainConfig.content, main);
		content.render();
		this.components.content = content;

		const aside = new Container(mainConfig.aside, main);
		aside.render();
		this.components.aside = aside;

		const logoutButton: HTMLElement = header.htmlElement.querySelector(
			'.header-profile-logout',
		) as HTMLElement;
		// Logout click handler
		const logoutButtonHandler = () => {
			Ajax.post(
				this.app.config.URL.logout,
				{},
				(data: object | null, error: object | null) => {
					if (!error) {
						this.app.goToPage(PAGE_LINKS.login, true);
					}
				},
			);
		};
		header.addHandler(logoutButton, 'click', logoutButtonHandler);

		// Initial posts request
		this.#fillContent();

		// Posts request on scroll
		const createScrollHandler = () => {
			let active = false;
			return async () => {
				if (
					!active &&
					window.innerHeight * 2 + window.scrollY >
						document.body.offsetHeight
				) {
					active = true;
					const promise = this.#addPostPromise();
					await promise
						.then((body) => {
							content.removeMessage();
							const postsData = body.data;
							postsData.forEach(
								({ header, body, created_at }) => {
									const post = new Post(
										{
											key: (this.counter++).toString(), // Это пока что костыль
											title: header,
											text: body,
											date: created_at,
										},
										this.components.content,
									);
									post.render();
								},
							);
						})
						.catch(async () => {
							content.printMessage('Что-то пошло не так');
							await new Promise((resolve) =>
								setTimeout(resolve, 5000),
							);
						});
					active = false;
				}
			};
		};
		content.addHandler(document, 'scroll', createScrollHandler());
	}

	/**
	 * Rendering menu
	 */
	#renderMenu() {
		if (this.components.menu) {
			return;
		}
		const menuConfig = this.app.config.homeConfig.menu;

		const menu = new Menu(menuConfig, this.app.root);
		this.components.menu = menu;
		menu.render();

		// Click on feed link handler
		menu.addHandler(
			menu.htmlElement.querySelector('a[data-key="feed"]') as HTMLElement,
			'click',
			(event) => {
				event.preventDefault();
				this.app.goToPage(PAGE_LINKS.feed, true); // true потом убрать
			},
		);
		// Click on title handler
		menu.addHandler(
			menu.htmlElement.querySelector(
				`a[data-key=${menuConfig.title.key}]`,
			) as HTMLElement,
			'click',
			(event) => {
				event.preventDefault();
				this.app.goToPage(PAGE_LINKS.feed, true); // true потом убрать
			},
		);
	}

	/**
	 *
	 * Filling content with posts
	 */
	#fillContent() {
		const content = this.components.content as IContent;
		const promise = this.#addPostPromise();
		promise
			.then((body) => {
				content.removeMessage();
				const posts = body.data;
				posts.forEach((postData) => {
					const post = new Post(
						{
							key: (this.counter++).toString(), // Это временный костыль
							title: postData.header,
							text: postData.body,
							date: postData.created_at,
						},
						content,
					);
					post.render();
				});
			})
			.catch(() => {
				content.printMessage('Что-то пошло не так');
				this.app.goToPage(PAGE_LINKS.login, true);
			});
	}

	/**
	 * Returns promise to add new post
	 *
	 * @returns {Promise<Object>}
	 */
	#addPostPromise(): Promise<PostResponse> {
		return Ajax.getPromise(this.app.config.URL.post);
	}
}

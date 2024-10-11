import { PAGE_LINKS } from '../../app.ts';
import {
	Container,
	Content,
	Header,
	Menu,
	Post,
} from '../../components/index.ts';
import Ajax from '../../modules/ajax.ts';
import BasePage from '../basePage.ts';
import { MainConfig } from '../../config.ts'

export const homePageTypes = {
	feed: 'feed',
};

export default class HomePage extends BasePage {
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

	#renderFeed(): void {
		const mainConfig: MainConfig = this.app.config.homeConfig.main;

		this.#renderMenu();

		const main = new Container(mainConfig, this.app.root);
		main.render();
		this.structure.main = main;

		const header = new Header(mainConfig.header, main);
		main.addChild(header);
		header.render();
		this.structure.main.header = header;

		const content = new Content(mainConfig.content, main);
		main.addChild(content);
		content.render();
		this.structure.main.content = content;

		const aside = new Container(mainConfig.aside, main);
		main.addChild(aside);
		aside.render();
		this.structure.main.aside = aside;

		const logoutButton: HTMLElement = header.htmlElement.querySelector(
			'.header-profile-logout',
		) as HTMLElement;
		// Logout click handler
		const logoutButtonHandler = () => {
			Ajax.post(this.app.config.URL.logout, {}, (data, error) => {
				if (!error) {
					this.app.goToPage(PAGE_LINKS.login, true);
				}
			});
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
											title: header,
											text: body,
											date: created_at,
										},
										this.structure.main.content.htmlElement,
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
		content.addHandler(document.body, 'scroll', createScrollHandler());
	}

	/**
	 * Rendering menu
	 */
	#renderMenu() {
		if (this.structure.menu) {
			return;
		}
		const menuConfig = this.app.config.homeConfig.menu;

		const menu = new Menu(menuConfig, this.app.root);
		this.structure.menu = menu;
		menu.render();

		// Click on feed link handler
		menu.addHandler(
			menu.htmlElement.querySelector('a[data-key="feed"]') as HTMLElement,
			'click',
			(event) => {
				event.preventDefault();
				this.app.goToPage(PAGE_LINKS.feed);
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
				this.app.goToPage(PAGE_LINKS.feed);
			},
		);
	}

	/**
	 *
	 * Filling content with posts
	 */
	#fillContent() {
		const content = this.structure.main.content;
		const promise = this.#addPostPromise();
		promise
			.then((body) => {
				content.removeMessage();
				const posts = body.data;
				posts.forEach((postData) => {
					const post = new Post(
						{
							title: postData.header,
							text: postData.body,
							date: postData.created_at,
						},
						content.htmlElement,
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
	#addPostPromise(): Promise<any> {
		return Ajax.getPromise(this.app.config.URL.post);
	}
}

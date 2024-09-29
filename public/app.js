import Container from './components/Container/Container.js';
import Header from './components/Header/Header.js';
import LoginForm from './components/LoginForm/LoginForm.js';
import Menu from './components/Menu/Menu.js';
import Post from './components/Post/Post.js';
import SignupForm from './components/SignupForm/SignupForm.js';
import Ajax from './modules/ajax.js';
import Validator from './modules/validation.js';

/**
 * Links to pages
 * @constant
 */
export const PAGE_LINKS = {
	feed: '/feed',
	login: '/login',
	signup: '/signup',
};

/**
 * Main class of application
 */
export default class App {
	#state = {};
	#structure = {};
	#config;
	root;
	/**
	 * Instance of application
	 *
	 * @param {Object} config - config of application
	 * @param {HTMLElement} root - root element
	 */
	constructor(config, root) {
		this.#config = config;
		this.root = root;
		this.#state.user = null;
	}
	/**
	 * Routing pages
	 *
	 * @param {string} pageLink
	 */
	render(pageLink) {
		switch (pageLink) {
			case PAGE_LINKS.signup:
				history.pushState({}, '', PAGE_LINKS.signup);
				this.#renderSignup();
				break;
			case PAGE_LINKS.login:
				history.pushState({}, '', PAGE_LINKS.login);
				this.#renderLogin();
				break;
			default:
				history.pushState({}, '', PAGE_LINKS.feed);
				this.#renderFeed();
		}
	}
	/**
	 * Routing to clearing previous components and rendering new
	 *
	 * @param {string} pageLink
	 * @param {boolean} deleteEverything - deleting all components
	 */
	goToPage(pageLink, deleteEverything = false) {
		this.clear(deleteEverything);
		this.render(pageLink);
	}
	/**
	 * Clearing previous components
	 *
	 * @param {boolean} deleteEverything - deleting all components
	 */
	clear(deleteEverything) {
		Object.keys(this.#structure).forEach((key) => {
			if (deleteEverything || key !== 'menu') {
				this.#structure[key].remove();
				delete this.#structure[key];
			}
		});
	}
	/**
	 * Rendering menu
	 */
	#renderMenu() {
		if (this.#structure.menu) {
			return;
		}
		const menu = new Menu(this.#config.homeConfig.menu, this.root);
		this.#structure.menu = menu;
		menu.render();
		menu.addHandler(
			menu.htmlElement.querySelector('a[data-section="feed"]'),
			'click',
			(event) => {
				event.preventDefault();
				this.goToPage(PAGE_LINKS.feed);
			},
		);
		menu.addHandler(
			menu.htmlElement.querySelector(
				`a[data-section=${this.#config.homeConfig.menu.title.section}]`,
			),
			'click',
			(event) => {
				event.preventDefault();
				this.goToPage(PAGE_LINKS.feed);
			},
		);
	}
	/**
	 * Rendering feed
	 */
	#renderFeed() {
		const config = this.#config.homeConfig;

		this.#renderMenu();

		const main = new Container({ key: 'main', ...config.main }, this.root);
		main.render();
		this.#structure.main = main;

		const header = new Header(
			{ key: 'header', ...config.main.header },
			main.htmlElement,
		);
		main.addChild(header);
		header.render();
		this.#structure.main.header = header;

		const content = new Container(
			{ key: 'content', ...config.main.content },
			main.htmlElement,
		);
		main.addChild(content);
		content.render();
		this.#structure.main.content = content;

		const aside = new Container(
			{
				key: 'aside',
				...config.main.aside,
			},
			main.htmlElement,
		);
		main.addChild(aside);
		aside.render();
		this.#structure.main.aside = aside;

		const logoutButton = header.htmlElement.querySelector(
			'.header-profile-logout',
		);
		const logoutButtonHandler = () => {
			Ajax.post(this.#config.URL.logout, {}, (data, error) => {
				if (error) {
					console.log('logoutError:', error);
				}
				this.goToPage(PAGE_LINKS.login, true);
			});
		};
		header.addHandler(logoutButton, 'click', logoutButtonHandler);

		this.#fillContent();

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
							const postsData = body.data;
							postsData.forEach(
								({ header, body, created_at }) => {
									const post = new Post(
										{
											title: header,
											text: body,
											date: created_at,
										},
										this.#structure.main.content.htmlElement,
									);
									post.render();
								},
							);
						})
						.catch(async (error) => {
							console.log(error);
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
	 * Adding new posts while scrolling window
	 */
	#addPosts() {
		let config;
		Ajax.get(this.#config.URL.post, (data, error) => {
			if (error) {
				console.log('add post error:', error);
			} else if (data) {
				config = data;
				const post = new Post(
					config,
					this.#structure.main.content.htmlElement,
				);
				post.render();
			}
		});
	}
	/**
	 * Returns promise to add new post
	 *
	 * @returns {Promise<Object>}
	 */
	#addPostPromise() {
		return Ajax.getPromise(this.#config.URL.post);
	}
	/**
	 *
	 * Filling content with posts
	 */
	#fillContent() {
		const promise = this.#addPostPromise();
		promise
			.then((body) => {
				const posts = body.data;
				posts.forEach((postData) => {
					const post = new Post(
						{
							title: postData.header,
							text: postData.body,
							date: postData.created_at,
						},
						this.#structure.main.content.htmlElement,
					);
					post.render();
				});
			})
			.catch((error) => {
				console.log(error);
				this.goToPage(PAGE_LINKS.login, true);
			});
	}
	/**
	 * Rendering signup page
	 */
	#renderSignup() {
		const config = this.#config.signupConfig;
		const signUp = new SignupForm(config, this.root);
		signUp.render();
		this.#structure.signUp = signUp;

		const signupForm = signUp.htmlElement.querySelector('form');
		const submitHandler = (event) => {
			event.preventDefault();
			signUp.clearError();
			const validator = new Validator();
			const data = validator.validateForm(config.inputs, signupForm);
			if (data) {
				Ajax.sendForm(
					this.#config.URL.signup,
					data,
					(response, error) => {
						if (error) {
							signUp.printError('Что-то пошло не так');
							return;
						}
						if (response.ok) {
							this.goToPage(PAGE_LINKS.feed, true);
						} else {
							signUp.printError('Что-то пошло не так');
						}
					},
				);
			}
		};
		signUp.addHandler(signupForm, 'submit', submitHandler);

		const toLoginLink = signUp.items.toLoginLink;
		const clickHandler = (event) => {
			event.preventDefault();
			this.goToPage(PAGE_LINKS.login, true);
		};
		toLoginLink.addHandler('click', clickHandler);
	}
	/**
	 * Rendering login page
	 */
	#renderLogin() {
		const config = this.#config.loginConfig;
		const login = new LoginForm(config, this.root);
		login.render();
		this.#structure.login = login;

		const loginForm = login.htmlElement.querySelector('form');
		const submitHandler = (event) => {
			event.preventDefault();
			login.clearError();
			const validator = new Validator();
			const data = validator.validateForm(config.inputs, loginForm);
			if (data) {
				Ajax.sendForm(
					this.#config.URL.login,
					data,
					(response, error) => {
						if (error) {
							login.printError('Что-то пошло не так');
							return;
						}
						if (response.ok) {
							this.goToPage(PAGE_LINKS.feed, true);
						} else {
							login.printError('Что-то пошло не так');
						}
					},
				);
			}
		};
		login.addHandler(loginForm, 'submit', submitHandler);

		const toSignupLink = login.items.toSignupLink;
		const clickHandler = (event) => {
			event.preventDefault();
			this.goToPage(PAGE_LINKS.signup, true);
		};
		toSignupLink.addHandler('click', clickHandler);

		const titleLink = login.htmlElement.querySelector('a.title-link');
		const titleLinkClickHandler = (event) => {
			event.preventDefault();
			this.goToPage(PAGE_LINKS.feed, true);
		};
		login.addHandler(titleLink, 'click', titleLinkClickHandler);
	}
}

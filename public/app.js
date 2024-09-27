import Container from './components/Container/Container.js';
import Header from './components/Header/Header.js';
import LoginForm from './components/LoginForm/LoginForm.js';
import Menu from './components/Menu/Menu.js';
import Post from './components/Post/Post.js';
import SignupForm from './components/SignupForm/SignupForm.js';
import Ajax from './modules/ajax.js';

export const PAGE_LINKS = {
	feed: '/feed',
	login: '/login',
	signup: '/signup',
};

export default class App {
	#state = {};
	handlers = {};
	#structure = {};
	config;
	root;
	constructor(config, root) {
		this.config = config;
		this.root = root;
		this.#state.user = null;
	}
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
	goToPage(pageLink, deleteEverything = false) {
		this.clear(deleteEverything);
		this.render(pageLink);
	}
	clear(deleteEverything) {
		document.removeEventListener('scroll', this.handlers.scrollHandler);
		Object.keys(this.#structure).forEach((key) => {
			if (deleteEverything || key !== 'menu') {
				this.#structure[key].remove();
				delete this.#structure[key];
			}
		});
	}
	#renderMenu() {
		const menu = new Menu(this.config.homeConfig.menu, this.root);
		if (!this.#structure.menu) {
			this.#structure.menu = menu;
			menu.render();
		}
		// хэндлеры добавлять после рендера, иначе стираются eventListenerы (при использовании innerHTML +=)
		menu.addHandler(
			menu.htmlElement.querySelector('a[data-section="feed"]'),
			'click',
			(event) => {
				event.preventDefault();
				this.goToPage(PAGE_LINKS.feed);
			},
		);
		menu.addHandler(
			menu.htmlElement.querySelector('a[data-section="signup"]'),
			'click',
			(event) => {
				event.preventDefault();
				this.goToPage(PAGE_LINKS.signup, true);
			},
		);
	}

	#renderFeed() {
		const config = this.config.homeConfig;

		this.#renderMenu();

		const main = new Container({ key: 'main', ...config.main }, this.root);
		main.render();
		this.#structure.main = main;

		const header = new Header(
			{ key: 'header', ...config.main.header },
			main.htmlElement,
		);
		header.render();
		this.#structure.main.header = header;

		const content = new Container(
			{ key: 'content', ...config.main.content },
			main.htmlElement,
		);
		content.render();
		this.#structure.main.content = content;

		const aside = new Container(
			{
				key: 'aside',
				...config.main.aside,
			},
			main.htmlElement,
		);
		aside.render();
		this.#structure.main.aside = aside;

		const logoutButton = header.htmlElement.querySelector(
			'img.header-profile-logout',
		);
		const logoutButtonHandler = () => {
			Ajax.post('/auth/logout', {}, (data, error) => {
				if (error) {
					console.log('logoutError:', error);
				}
				this.goToPage(PAGE_LINKS.login, true);
			});
		};
		header.addHandler(logoutButton, 'click', logoutButtonHandler);

		this.#fillContent();

		this.handlers.scrollHandler = () => {
			const scrollPosition = window.scrollY;
			const contentHeight = document.body.offsetHeight;
			const windowHeight = window.innerHeight;

			if (scrollPosition + windowHeight * 2 >= contentHeight) {
				this.#addPost();
			}
		};
		document.addEventListener('scroll', this.handlers.scrollHandler);
	}
	#addPost() {
		let config;
		Ajax.get('/api/post', (data, error) => {
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
	#addPostPromise() {
		return Ajax.getPromise('/api/post');
	}
	#fillContent() {
		let toLogin = false;
		const fill = async () => {
			while (window.innerHeight * 2 > document.body.offsetHeight) {
				if (toLogin) {
					return;
				}
				const promise = this.#addPostPromise();
				await promise
					.then((data) => {
						const post = new Post(
							data,
							this.#structure.main.content.htmlElement,
						);
						post.render();
					})
					.catch((error) => {
						if (error.message === 'Unauthorized') {
							toLogin = true;
						} else {
							return new Promise((resolve) =>
								setTimeout(resolve, 5000),
							);
						}
					});
			}
		};
		fill().then(() => {
			if (toLogin) {
				this.goToPage(PAGE_LINKS.login, true);
			}
		});
	}
	#renderSignup() {
		const config = this.config.signupConfig;
		const signUp = new SignupForm(config.inputs, config.button, this.root);
		signUp.render();
		this.#structure.signUp = signUp;
	}
	#renderLogin() {
		const config = this.config.loginConfig;
		const login = new LoginForm(
			config,
			this.root,
			this.goToPage.bind(this),
		);
		login.render();
		this.#structure.login = login;
	}
}

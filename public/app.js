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
	state;
	handlers = {};
	#structure = {};
	config;
	root;
	constructor(config, root) {
		this.config = config;
		this.root = root;
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
	goToPage(pageLink) {
		this.clear();
		this.render(pageLink);
	}
	clear() {
		document.removeEventListener('scroll', this.handlers.scrollHandler);
		Object.keys(this.#structure).forEach((key) => {
			this.#structure[key].remove();
		});
	}
	#renderFeed() {
		const config = this.config.homeConfig;

		const menu = new Menu(config.menu, this.root);
		this.#structure.menu = menu;
		menu.render();

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
		this.#structure.main.content;

		const aside = new Container(
			{
				key: 'aside',
				...config.main.aside,
			},
			main.htmlElement,
		);
		aside.render();

		for (let i = 0; i < 50; i++) {
			const post = new Post(
				{ className: 'post', text: 'это пост' },
				content.htmlElement,
			);
			post.render();
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
				this.goToPage(PAGE_LINKS.signup);
			},
		);

		this.handlers.scrollHandler = () => {
			const scrollPosition = window.scrollY;
			const contentHeight = document.body.offsetHeight;
			const windowHeight = window.innerHeight;

			if (scrollPosition + windowHeight >= contentHeight) {
				let config;
				Ajax.get('/api/post', (data, error) => {
					if (error) {
					} else if (data) {
						config = { className: 'post', ...data };
						const post = new Post(config, content.htmlElement);
						post.render();
					}
				});
			}
		};
		document.addEventListener('scroll', this.handlers.scrollHandler);
	}
	#renderSignup() {
		const config = this.config.signupConfig;

		const signupForm = new SignupForm(config, this.root);
		signupForm.render();
	}
	#renderLogin() {
		const config = this.config.loginConfig;

		const loginForm = new LoginForm(config, this.root);
		loginForm.render();
	}
}

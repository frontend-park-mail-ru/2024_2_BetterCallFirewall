import { Root } from './components/index.js';
import {
	HomePage,
	homePageTypes,
	LoginPage,
	SignupPage,
} from './pages/index.js';

/**
 * Links to pages
 * @constant
 */
export const PAGE_LINKS = {
	feed: '/feed',
	login: '/login',
	signup: '/signup',
};

export const PAGES = {
	home: 'home',
	login: 'login',
	signup: 'signup',
};

/**
 * Main class of application
 */
export default class App {
	#state = {};
	#pages = {};
	#structure = {};
	#config;
	root;
	/**
	 * Instance of application
	 *
	 * @param {Object} config - config of application
	 * @param {HTMLElement} root - root element
	 */
	constructor(config) {
		this.#config = config;
		this.root = new Root();
		this.#state.user = null;
		this.#state.currentPage = {};
		this.#pages.home = new HomePage(this);
		this.#pages.login = new LoginPage(this);
		this.#pages.signup = new SignupPage(this);
	}

	/**
	 * Возвращает конфигурационный объект приложения
	 * @returns {Object}
	 */
	get config() {
		return this.#config;
	}

	/**
	 * Возвращает объект стуктуры приложения
	 * @returns {Object}
	 */
	get structure() {
		return this.#structure;
	}

	/**
	 * Routing pages
	 *
	 * @param {string} pageLink
	 */
	render(pageLink) {
		let pageType;
		switch (pageLink) {
			case PAGE_LINKS.signup:
				history.pushState({}, '', PAGE_LINKS.signup);
				this.#state.currentPage = this.#pages.signup;
				break;
			case PAGE_LINKS.login:
				history.pushState({}, '', PAGE_LINKS.login);
				this.#state.currentPage = this.#pages.login;
				break;
			default:
				history.pushState({}, '', PAGE_LINKS.feed);
				this.#state.currentPage = this.#pages.home;
				pageType = homePageTypes.feed;
		}
		this.#state.currentPage.render(pageType);
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
		const structure = this.#state.currentPage.structure;
		if (structure) {
			Object.keys(structure).forEach((key) => {
				if (deleteEverything || key !== 'menu') {
					structure[key].remove();
					delete structure[key];
				}
			});
		}
	}
}

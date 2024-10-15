import {
	IContainerConfig,
	IContentConfig,
	IHeaderConfig,
	ILoginFormConfig,
	IMenuConfig,
	ISignupFormConfig,
	Root,
} from './components/index';
import { Router, RouterConfig } from './router/router';
import { PAGE_LINKS } from './config';
import { ViewHome } from './views/home/viewHome';

export const PAGES = {
	home: 'home',
	login: 'login',
	signup: 'signup',
};

export interface URLInterface {
	signup: string;
	login: string;
	logout: string;
	post: string;
}

export interface IMainConfig {
	key: string;
	className: string;
	section: string;
	header: IHeaderConfig;
	content: IContentConfig;
	aside: IContainerConfig;
}

export interface IHomeConfig {
	menu: IMenuConfig;
	main: IMainConfig;
}

export interface IAppConfig {
	URL: URLInterface;
	homeConfig: IHomeConfig;
	signupConfig: ISignupFormConfig;
	loginConfig: ILoginFormConfig;
}

/**
 * Main class of application
 */
export default class App {
	private _router: Router;
	private _config: IAppConfig;
	private _root: Root;

	/**
	 * Instance of application
	 *
	 * @param {IAppConfig} config - config of application
	 */
	constructor(config: IAppConfig) {
		this._config = config;
		this._root = new Root();

		const homeView = new ViewHome(this._config.homeConfig, this._root);
		const routerConfig: RouterConfig = [
			{
				path: PAGE_LINKS.feed,
				view: homeView,
			},
		];
		this._router = new Router(routerConfig);

		if (this._router.activeView) {
			console.log('exist');
			this._router.activeView?.render();
		} else {
			console.log('does not exist');
		}
		console.log(this);
	}

	get router() {
		return this._router;
	}

	// /**
	//  * Возвращает конфигурационный объект приложения
	//  * @returns {IAppConfig}
	//  */
	// get config(): IAppConfig {
	// 	return this._config;
	// }

	// /**
	//  * @returns {Root}
	//  */
	// get root(): Root {
	// 	return this._root;
	// }

	// /**
	//  * Routing pages
	//  *
	//  * @param {string} pageLink
	//  */
	// render(pageLink: string) {
	// 	let pageType: string = '';
	// 	switch (pageLink) {
	// 		case PAGE_LINKS.signup:
	// 			history.pushState({}, '', PAGE_LINKS.signup);
	// 			this.state.currentPage = this.pages.signup;
	// 			break;
	// 		case PAGE_LINKS.login:
	// 			history.pushState({}, '', PAGE_LINKS.login);
	// 			this.state.currentPage = this.pages.login;
	// 			break;
	// 		default:
	// 			history.pushState({}, '', PAGE_LINKS.feed);
	// 			this.state.currentPage = this.pages.home;
	// 			pageType = homePageTypes.feed;
	// 	}
	// 	this.state.currentPage?.render(pageType);
	// }

	// /**
	//  * Routing to clearing previous components and rendering new
	//  *
	//  * @param {string} pageLink
	//  * @param {boolean} deleteEverything
	//  */
	// goToPage(pageLink: string, deleteEverything: boolean = false) {
	// 	this.clear(deleteEverything);
	// 	this.render(pageLink);
	// }

	// /**
	//  * Clearing previous components
	//  *
	//  * @param {boolean} deleteEverything
	//  */
	// clear(deleteEverything: boolean) {
	// 	if (this.state.currentPage === this.pages.home) {
	// 		const page = this.state.currentPage as IHomePage;
	// 		if (deleteEverything) {
	// 			page.clear();
	// 		} else {
	// 			page.clearContent();
	// 		}
	// 		return;
	// 	}
	// 	this.state.currentPage?.clear();
	// }
}

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
import config, { PAGE_LINKS } from './config';
import { ViewLogin } from './views/login/viewLogin';
import { ViewSignup } from './views/signup/viewSignup';
import { StoreMenu } from './stores/storeMenu';
import { ACTION_MENU_TYPES } from './actions/actionMenu';
import { ViewFeed } from './views/feed/viewFeed';
import { StoreHeader } from './stores/storeHeader';
import { ACTION_HEADER_TYPES } from './actions/actionHeader';
import { StoreLogin } from './stores/storeLogin';
import { ACTION_USER_TYPES } from './actions/actionUser';
import { StoreApp } from './stores/storeApp';
import { ACTION_LOGIN_TYPES } from './actions/actionLogin';
import { ACTION_APP_TYPES, ActionAppInit } from './actions/actionApp';
import dispatcher from './dispatcher/dispatcher';
import { StoreSignup } from './stores/storeSignup';
import { StoreFeed } from './stores/storeFeed';
import { ACTION_SIGNUP_TYPES } from './actions/actionSignup';
import { ViewFriends } from './views/friends/viewFriends';

export const PAGES = {
	home: 'home',
	login: 'login',
	signup: 'signup',
	friends: 'friends',
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
class App {
	private _router: Router;
	private _config: IAppConfig;
	private _root: Root;

	private _storeApp: StoreApp;
	private _storeMenu: StoreMenu;
	private _storeHeader: StoreHeader;
	private _storeLogin: StoreLogin;
	private _storeSignup: StoreSignup;
	private _storeFeed: StoreFeed;

	/**
	 * Instance of application
	 *
	 * @param {IAppConfig} config - config of application
	 */
	constructor(config: IAppConfig) {
		this._config = config;
		this._root = new Root();

		const feedView = new ViewFeed(this._config.homeConfig, this._root);
		const loginView = new ViewLogin(this._config.loginConfig, this._root);
		const friendView = new ViewFriends(this._config.homeConfig, this._root);
		const signupView = new ViewSignup(
			this._config.signupConfig,
			this._root,
		);
		const routerConfig: RouterConfig = [
			{
				path: PAGE_LINKS.feed,
				view: feedView,
			},
			{
				path: PAGE_LINKS.login,
				view: loginView,
			},
			{
				path: PAGE_LINKS.signup,
				view: signupView,
			},
			{
				path: PAGE_LINKS.friends,
				view: friendView,
			}
		];
		this._router = new Router(routerConfig);

		this._storeApp = new StoreApp();
		this._storeApp.subscribe(ACTION_LOGIN_TYPES.actionLoginToSignupClick);
		this._storeApp.subscribe(ACTION_SIGNUP_TYPES.toLoginLinkClick);
		this._storeApp.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._storeApp.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._storeApp.subscribe(ACTION_MENU_TYPES.titleClick);

		this._storeMenu = new StoreMenu();
		this._storeMenu.subscribe(ACTION_MENU_TYPES.menuLinkClick);
		this._storeMenu.subscribe(ACTION_MENU_TYPES.titleClick);

		this._storeHeader = new StoreHeader();
		this._storeHeader.subscribe(ACTION_HEADER_TYPES.logoutClickFail);

		this._storeLogin = new StoreLogin();
		this._storeLogin.subscribe(ACTION_HEADER_TYPES.logoutClickSuccess);
		this._storeLogin.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._storeLogin.subscribe(ACTION_USER_TYPES.formError);
		this._storeLogin.subscribe(ACTION_SIGNUP_TYPES.toLoginLinkClick);

		this._storeSignup = new StoreSignup();
		this._storeSignup.subscribe(ACTION_USER_TYPES.formError);
		this._storeSignup.subscribe(ACTION_USER_TYPES.signupClickSuccess);
		this._storeSignup.subscribe(
			ACTION_LOGIN_TYPES.actionLoginToSignupClick,
		);

		this._storeFeed = new StoreFeed();
		this._storeFeed.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._storeFeed.subscribe(ACTION_USER_TYPES.signupClickSuccess);

		feedView.register(this._storeFeed);
		feedView.register(this._storeMenu);
		feedView.register(this._storeHeader);

		loginView.register(this._storeLogin);

		signupView.register(this._storeSignup);
	}

	init() {
		dispatcher.getAction(new ActionAppInit());
	}

	get router() {
		return this._router;
	}
}

export default new App(config);

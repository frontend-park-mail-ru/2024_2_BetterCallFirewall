import {
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
import {
	ACTION_MENU_TYPES,
	ActionUpdateProfileLinkHref,
} from './actions/actionMenu';
import { ViewFeed } from './views/feed/viewFeed';
import { ViewProfile } from './views/profile/viewProfile';
import { StoreProfile } from './stores/storeProfile';
import { ACTION_PROFILE_TYPES } from './actions/actionProfile';
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
import { StoreMain } from './stores/storeMain';
import { MainConfig } from './views/home/viewHome';
import { StoreHome } from './stores/storeHome';

export interface URLInterface {
	signup: string;
	login: string;
	logout: string;
	post: string;
}

export interface IHomeConfig {
	menu: IMenuConfig;
	main: MainConfig;
}

export interface IAppConfig {
	URL: URLInterface;
	homeConfig: IHomeConfig;
	signupConfig: ISignupFormConfig;
	loginConfig: ILoginFormConfig;
}

export interface AppStores {
	app: StoreApp;
	menu: StoreMenu;
	header: StoreHeader;
	main: StoreMain;
	home: StoreHome;
	login: StoreLogin;
	signup: StoreSignup;
	profile: StoreProfile;
	feed: StoreFeed;
}

/**
 * Main class of application
 */
class App {
	private _router: Router;
	private _config: IAppConfig;
	private _root: Root;
	private _stores: AppStores;

	/**
	 * Instance of application
	 *
	 * @param {IAppConfig} config - config of application
	 */
	constructor(config: IAppConfig) {
		this._config = config;
		this._root = new Root();

		const feedView = new ViewFeed(this._config.homeConfig, this._root);
		const profileView = new ViewProfile(
			this._config.homeConfig,
			this._root,
		);
		const friendView = new ViewFriends(this._config.homeConfig, this._root);
		const loginView = new ViewLogin(this._config.loginConfig, this._root);
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
			},
			{
				path: PAGE_LINKS.profile,
				view: profileView,
			},
		];
		this._router = new Router(feedView, routerConfig);

		this._stores = {
			app: new StoreApp(),
			menu: new StoreMenu(),
			header: new StoreHeader(),
			main: new StoreMain(),
			home: new StoreHome(),
			login: new StoreLogin(),
			signup: new StoreSignup(),
			feed: new StoreFeed(),
			profile: new StoreProfile(),
		};

		this._stores.app.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.app.subscribe(ACTION_MENU_TYPES.titleClick);
		this._stores.app.subscribe(ACTION_MENU_TYPES.menuLinkClick);
		this._stores.app.subscribe(ACTION_LOGIN_TYPES.actionLoginToSignupClick);
		this._stores.app.subscribe(ACTION_SIGNUP_TYPES.toLoginLinkClick);
		this._stores.app.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._stores.app.subscribe(ACTION_PROFILE_TYPES.goToProfile);

		this._stores.home.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.home.subscribe(ACTION_MENU_TYPES.menuLinkClick);
		this._stores.home.subscribe(ACTION_MENU_TYPES.titleClick);
		this._stores.home.subscribe(ACTION_MENU_TYPES.updateProfileLinkHref);
		this._stores.home.subscribe(ACTION_HEADER_TYPES.logoutClickFail);

		this._stores.login.subscribe(ACTION_HEADER_TYPES.logoutClickSuccess);
		this._stores.login.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._stores.login.subscribe(ACTION_USER_TYPES.formError);
		this._stores.login.subscribe(ACTION_SIGNUP_TYPES.toLoginLinkClick);

		this._stores.signup.subscribe(ACTION_USER_TYPES.formError);
		this._stores.signup.subscribe(ACTION_USER_TYPES.signupClickSuccess);
		this._stores.signup.subscribe(
			ACTION_LOGIN_TYPES.actionLoginToSignupClick,
		);

		this._stores.feed.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._stores.feed.subscribe(ACTION_USER_TYPES.signupClickSuccess);

		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.updateProfile);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.goToProfile);

		loginView.register(this._stores.login);

		signupView.register(this._stores.signup);

		feedView.register(this._stores.feed);
		feedView.register(this._stores.home);

		profileView.register(this._stores.home);
		profileView.register(this._stores.profile);

		friendView.register(this._stores.menu);
		friendView.register(this._stores.header);
		friendView.register(this._stores.home);
	}

	get router(): Router {
		return this._router;
	}

	get stores(): AppStores {
		return this._stores;
	}

	init() {
		dispatcher.getAction(new ActionAppInit());
		dispatcher.getAction(new ActionUpdateProfileLinkHref('/lukeskywalker')); // Потом запрашивать данные юзера и вставить сюда
	}
}

export default new App(config);

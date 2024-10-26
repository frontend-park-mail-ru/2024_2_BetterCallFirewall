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
import { ViewProfile } from './views/profile/profileView';
import { StoreProfile } from './stores/storeProfile';
import { ACTION_PROFILE_TYPES } from './actions/actionProfile';
import { StoreHeader } from './stores/storeHeader';
import { ACTION_HEADER_TYPES } from './actions/actionHeader';
import { StoreLogin } from './stores/storeLogin';
import { ACTION_USER_TYPES } from './actions/actionUser';
import { StoreSignup } from './stores/storeSignup';

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
class App {
	private _router: Router;
	private _config: IAppConfig;
	private _root: Root;

	private _storeMenu: StoreMenu;
	private _storeProfile: StoreProfile;
	private _storeHeader: StoreHeader;
	private _storeLogin: StoreLogin;
	private _storeSignup: StoreSignup;

	/**
	 * Instance of application
	 *
	 * @param {IAppConfig} config - config of application
	 */
	constructor(config: IAppConfig) {
		this._config = config;
		this._root = new Root();

		const feedView = new ViewFeed(this._config.homeConfig, this._root);
		const profileView = new ViewProfile(this._config.homeConfig, this._root);
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
				path: PAGE_LINKS.profile,
				view: profileView,
			},
		];
		this._router = new Router(routerConfig);

		this._storeMenu = new StoreMenu();
		this._storeMenu.subscribe(ACTION_MENU_TYPES.menuLinkClick);
		
		this._storeProfile = new StoreProfile({
			key: 'profile',
			firstName: '',
            secondName: '',
            description: '',
            friendsCount: 0,
            groupsCount: 0,
            img: '',
		});
		this._storeProfile.subscribe(ACTION_PROFILE_TYPES.updateProfile);

		this._storeHeader = new StoreHeader();
		this._storeHeader.subscribe(ACTION_HEADER_TYPES.logoutClickFail);

		this._storeLogin = new StoreLogin();
		this._storeLogin.subscribe(ACTION_HEADER_TYPES.logoutClickSuccess);
		this._storeLogin.subscribe(ACTION_USER_TYPES.loginClickSuccess);
		this._storeLogin.subscribe(ACTION_USER_TYPES.formError);

		this._storeSignup = new StoreSignup();
		this._storeSignup.subscribe(ACTION_USER_TYPES.formError);
		this._storeSignup.subscribe(ACTION_USER_TYPES.signupClickSuccess);

		// this._storeLogin.subscribe(ACTION_USER_TYPES.formError); //
		
		feedView.register(this._storeMenu);
		profileView.register(this._storeProfile); // ????
		feedView.register(this._storeHeader);

		loginView.register(this._storeLogin);
		signupView.register(this._storeSignup);
	}

	init() {
		this._router.activeView?.render();
	}

	get router() {
		return this._router;
	}
}

export default new App(config);

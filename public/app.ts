import { ILoginFormConfig, ISignupFormConfig, Root } from './components/index';
import { Router, RouterConfig } from './router/router';
import config, { PAGE_LINKS } from './config';
import { ViewLogin } from './views/login/viewLogin';
import { ViewSignup } from './views/signup/viewSignup';
import { ACTION_MENU_TYPES } from './actions/actionMenu';
import { ViewFeed, ViewFeedConfig } from './views/feed/viewFeed';
import { ViewProfile, ViewProfileConfig } from './views/profile/viewProfile';
import { StoreProfile } from './stores/storeProfile';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetHeader,
} from './actions/actionProfile';
import { ACTION_HEADER_TYPES } from './actions/actionHeader';
import { StoreLogin } from './stores/storeLogin';
import { StoreApp } from './stores/storeApp';
import { ACTION_LOGIN_TYPES } from './actions/actionLogin';
import { ACTION_APP_TYPES } from './actions/actionApp';
import dispatcher from './dispatcher/dispatcher';
import { StoreSignup } from './stores/storeSignup';
import { StoreFeed } from './stores/storeFeed';
import { ACTION_SIGNUP_TYPES } from './actions/actionSignup';
import {
	ViewMessages,
	ViewMessagesConfig,
} from './views/messages/viewMessages';
import { ViewChat } from './views/chat/viewChat';
import { StoreMessages } from './stores/storeMessages';
import { ACTION_MESSAGES_TYPES } from './actions/actionMessages';
import { ViewChatConfig } from './views/chat/viewChat';
import { StoreChat } from './stores/storeChat';
import { ACTION_CHAT_TYPES } from './actions/actionChat';
import { ViewFriends, ViewFriendsConfig } from './views/friends/viewFriends';
import { HomeConfig } from './views/home/viewHome';
import { StoreHome } from './stores/storeHome';
import { StoreFriends } from './stores/storeFriends';
import { ACTION_FORM_TYPES } from './actions/actionForm';
import { ACTION_FEED_TYPES } from './actions/actionFeed';
import {
	ViewCreatePost,
	ViewCreatePostConfig,
} from './views/createPost/viewCreatePost';
import { StoreCreatePost } from './stores/storeCreatePost';
import { ACTION_CREATE_POST_TYPES } from './actions/actionCreatePost';

import { ACTION_USER_TYPES } from './actions/actionUser';
import {
	ViewProfileEdit,
	ViewProfileEditConfig,
} from './views/profileEdit/viewProfileEdit';
import { StoreProfileEdit } from './stores/storeProfileEditForm';
import { ACTION_PROFILE_EDIT_TYPES } from './actions/actionProfileEdit';
import { ACTION_FRIENDS_TYPES } from './actions/actionFriends';
import {
	ViewPostEdit,
	ViewPostEditConfig,
} from './views/PostEdit/viewPostEdit';
import { ACTION_POST_EDIT_TYPES } from './actions/actionPostEdit';
import { StorePostEdit } from './stores/storePostEdit';

export const PAGES = {
	home: 'home',
	login: 'login',
	signup: 'signup',
};

export interface URLInterface {
	signup: string;
	login: string;
	logout: string;
	feed: string; // Лента и создание поста
	profile: string;
	profileYourOwn: string;
	profiles: string;
	subscribeToProfile: string;
	acceptFriend: string;
	unsubscribeFromProfile: string;
	removeFriend: string;
	friends: string;
	subscribers: string;
	profileSubscriptions: string;
	header: string;
	post: string;
}

export interface AppConfig {
	URL: URLInterface;
	homeConfig: HomeConfig;
	signupConfig: ISignupFormConfig;
	loginConfig: ILoginFormConfig;
	feedConfig: ViewFeedConfig;
	profileConfig: ViewProfileConfig;
	profileEditConfig: ViewProfileEditConfig;
	messagesConfig: ViewMessagesConfig;
	chatConfig: ViewChatConfig;
	friendsConfig: ViewFriendsConfig;
	createPostConfig: ViewCreatePostConfig;
	editPostConfig: ViewPostEditConfig;
}

export interface AppStores {
	app: StoreApp;
	home: StoreHome;
	login: StoreLogin;
	signup: StoreSignup;
	profile: StoreProfile;
	feed: StoreFeed;
	messages: StoreMessages;
	chat: StoreChat;
	friends: StoreFriends;
	createPost: StoreCreatePost;
	profileEdit: StoreProfileEdit;
	postEdit: StorePostEdit;
}

/**
 * Main class of application
 */
class App {
	private _router: Router;
	private _config: AppConfig;
	private _root: Root;
	private _stores: AppStores;
	private _inited: boolean = false;

	/**
	 * Instance of application
	 *
	 * @param {AppConfig} config - config of application
	 */
	constructor(config: AppConfig) {
		this._config = config;
		this._root = new Root();

		const feedView = new ViewFeed(this._config.feedConfig, this._root);
		const profileView = new ViewProfile(
			this._config.profileConfig,
			this._root,
		);
		const friendView = new ViewFriends(
			this._config.friendsConfig,
			this._root,
		);
		const loginView = new ViewLogin(this._config.loginConfig, this._root);
		const signupView = new ViewSignup(
			this._config.signupConfig,
			this._root,
		);
		const createPostView = new ViewCreatePost(
			this._config.createPostConfig,
			this._root,
		);
		const profileEditView = new ViewProfileEdit(
			this._config.profileEditConfig,
			this._root,
		);
		const messagesView = new ViewMessages(
			this._config.messagesConfig,
			this._root,
		);
		const chatView = new ViewChat(this._config.chatConfig, this._root);
		const postEditView = new ViewPostEdit(
			this._config.editPostConfig,
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
				path: PAGE_LINKS.messages,
				view: messagesView,
			},
			{
				path: PAGE_LINKS.createPost,
				view: createPostView,
			},
			{
				path: PAGE_LINKS.profileEdit,
				view: profileEditView,
			},
			{
				path: PAGE_LINKS.chat,
				view: chatView,
			},
			{
				path: PAGE_LINKS.friends,
				view: friendView,
			},
			{
				path: PAGE_LINKS.postEdit,
				view: postEditView,
			},
			{
				path: PAGE_LINKS.profile, // Должен быть последним
				view: profileView,
			},
		];
		this._router = new Router(feedView, routerConfig);

		const storeHome = new StoreHome();
		this._stores = {
			app: new StoreApp(),
			home: storeHome,
			login: new StoreLogin(),
			signup: new StoreSignup(),
			feed: new StoreFeed(storeHome),
			profile: new StoreProfile(storeHome),
			friends: new StoreFriends(storeHome),
			messages: new StoreMessages(storeHome),
			chat: new StoreChat(storeHome),
			createPost: new StoreCreatePost(storeHome),
			profileEdit: new StoreProfileEdit(storeHome),
			postEdit: new StorePostEdit(storeHome),
		};

		this._stores.app.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.app.subscribe(ACTION_USER_TYPES.unauthorized);
		this._stores.app.subscribe(ACTION_MENU_TYPES.titleClick);
		this._stores.app.subscribe(ACTION_MENU_TYPES.menuLinkClick);
		this._stores.app.subscribe(ACTION_LOGIN_TYPES.toSignupClick);
		this._stores.app.subscribe(ACTION_LOGIN_TYPES.loginClickSuccess);
		this._stores.app.subscribe(ACTION_SIGNUP_TYPES.toLoginLinkClick);
		this._stores.app.subscribe(ACTION_SIGNUP_TYPES.signupClickSuccess);
		this._stores.app.subscribe(ACTION_FEED_TYPES.postsRequestFail);
		this._stores.app.subscribe(ACTION_PROFILE_TYPES.getHeaderFail);
		this._stores.app.subscribe(ACTION_CHAT_TYPES.goToChat);
		this._stores.app.subscribe(ACTION_CREATE_POST_TYPES.goToCreatePost);
		this._stores.app.subscribe(ACTION_PROFILE_EDIT_TYPES.goToProfileEdit);
		this._stores.app.subscribe(ACTION_POST_EDIT_TYPES.goToPostEdit);
		this._stores.app.subscribe(ACTION_POST_EDIT_TYPES.requestSuccess);
		this._stores.app.subscribe(ACTION_PROFILE_EDIT_TYPES.requestSuccess);

		this._stores.home.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.home.subscribe(ACTION_MENU_TYPES.menuLinkClick);
		this._stores.home.subscribe(ACTION_MENU_TYPES.titleClick);
		this._stores.home.subscribe(ACTION_MENU_TYPES.updateProfileLinkHref);
		this._stores.home.subscribe(ACTION_HEADER_TYPES.logoutClickFail);
		this._stores.home.subscribe(
			ACTION_PROFILE_TYPES.getYourOwnProfileSuccess,
		);
		this._stores.home.subscribe(ACTION_PROFILE_TYPES.getHeaderSuccess);

		this._stores.login.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.login.subscribe(ACTION_USER_TYPES.unauthorized);
		this._stores.login.subscribe(ACTION_HEADER_TYPES.logoutClickSuccess);
		this._stores.login.subscribe(ACTION_FORM_TYPES.formError);
		this._stores.login.subscribe(ACTION_LOGIN_TYPES.loginClickSuccess);
		this._stores.login.subscribe(ACTION_SIGNUP_TYPES.toLoginLinkClick);
		this._stores.login.subscribe(ACTION_FEED_TYPES.postsRequestFail);

		this._stores.signup.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.signup.subscribe(ACTION_FORM_TYPES.formError);
		this._stores.signup.subscribe(ACTION_SIGNUP_TYPES.signupClickSuccess);
		this._stores.signup.subscribe(ACTION_LOGIN_TYPES.toSignupClick);

		this._stores.feed.subscribe(ACTION_LOGIN_TYPES.loginClickSuccess);
		this._stores.feed.subscribe(ACTION_SIGNUP_TYPES.signupClickSuccess);
		this._stores.feed.subscribe(ACTION_FEED_TYPES.postsRequestSuccess);
		this._stores.feed.subscribe(ACTION_FEED_TYPES.postsRequestFail);

		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.updateProfile);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.goToProfile);
		this._stores.profile.subscribe(
			ACTION_PROFILE_TYPES.profileRequestSuccess,
		);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.profileRequestFail);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.getYourOwnProfile);
		this._stores.profile.subscribe(
			ACTION_PROFILE_TYPES.getYourOwnProfileSuccess,
		);
		this._stores.profile.subscribe(
			ACTION_PROFILE_TYPES.getYourOwnProfileFail,
		);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.getHeader);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.getHeaderSuccess);
		this._stores.profile.subscribe(
			ACTION_PROFILE_EDIT_TYPES.requestSuccess,
		);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.profileRequest);

		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.getFriends);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.getFriendsSuccess);
		this._stores.friends.subscribe(
			ACTION_FRIENDS_TYPES.getSubscribersSuccess,
		);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.getUsersSuccess);

		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.goToMessages);
		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.updateMessages);

		this._stores.chat.subscribe(ACTION_CHAT_TYPES.goToChat);
		this._stores.chat.subscribe(ACTION_CHAT_TYPES.updateChat);

		this._stores.createPost.subscribe(
			ACTION_CREATE_POST_TYPES.updateCreatePost,
		);
		this._stores.createPost.subscribe(ACTION_FEED_TYPES.postCreateSuccess);
		this._stores.createPost.subscribe(ACTION_FEED_TYPES.postCreateFail);
		this._stores.createPost.subscribe(
			ACTION_CREATE_POST_TYPES.goToCreatePost,
		);

		this._stores.profileEdit.subscribe(
			ACTION_PROFILE_EDIT_TYPES.updateProfileEdit,
		);
		this._stores.profileEdit.subscribe(
			ACTION_PROFILE_EDIT_TYPES.goToProfileEdit,
		);
		this._stores.profileEdit.subscribe(
			ACTION_PROFILE_EDIT_TYPES.requestSuccess,
		);
		this._stores.profileEdit.subscribe(
			ACTION_PROFILE_EDIT_TYPES.requestFail,
		);

		this._stores.postEdit.subscribe(ACTION_POST_EDIT_TYPES.goToPostEdit);
		this._stores.postEdit.subscribe(ACTION_POST_EDIT_TYPES.requestSuccess);
		this._stores.postEdit.subscribe(ACTION_POST_EDIT_TYPES.requestFail);

		loginView.register(this._stores.login);

		signupView.register(this._stores.signup);

		feedView.register(this._stores.home);
		feedView.register(this._stores.feed);

		profileView.register(this._stores.home);
		profileView.register(this._stores.profile);

		messagesView.register(this._stores.home);
		messagesView.register(this._stores.messages);

		chatView.register(this._stores.home);
		chatView.register(this._stores.chat);

		createPostView.register(this._stores.home);
		createPostView.register(this._stores.createPost);

		profileEditView.register(this._stores.home);
		profileEditView.register(this._stores.profileEdit);

		friendView.register(this._stores.home);
		friendView.register(this._stores.friends);

		postEditView.register(this._stores.home);
		postEditView.register(this._stores.postEdit);
	}

	get router(): Router {
		return this._router;
	}

	get stores(): AppStores {
		return this._stores;
	}

	get config(): AppConfig {
		return this._config;
	}

	get inited(): boolean {
		return this._inited;
	}

	set inited(value: boolean) {
		this._inited = value;
	}

	init() {
		dispatcher.getAction(new ActionProfileGetHeader());
	}
}

export default new App(config);

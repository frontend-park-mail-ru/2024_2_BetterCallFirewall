import { ILoginFormConfig, SignupFormConfig, Root } from './components/index';
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
import { ACTION_APP_TYPES } from './actions/actionApp';
import dispatcher from './dispatcher/dispatcher';
import { StoreSignup } from './stores/storeSignup';
import { StoreFeed } from './stores/storeFeed';
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
import WebsocketClient from './modules/websocket';
import { ACTION_POST_TYPES } from './actions/actionPost';
import { ViewGroups, ViewGroupsConfig } from './views/groups/viewGroups';
import { StoreGroups } from './stores/storeGroups';
import {
	ViewGroupPage,
	ViewGroupPageConfig,
} from './views/groupPage/viewGroupPage';
import { StoreGroupPage } from './stores/storeGroupPage';
import {
	ViewCreateGroup,
	ViewCreateGroupConfig,
} from './views/createGroup/viewCreateGroup';
import { StoreCreateGroup } from './stores/storeCreateGroup';
import { ACTION_CREATE_GROUP_TYPES } from './actions/actionCreateGroup';
import { ViewQuestion, ViewQuestionConfig } from './views/viewQuestion';
import { ViewMetrics, ViewMetricsConfig } from './views/viewMetrics';
import { ACTION_GROUPS_TYPES } from './actions/actionGroups';
import { ACTION_GROUP_PAGE_TYPES } from './actions/actionGroupPage';
import {
	ViewGroupEdit,
	ViewGroupEditConfig,
} from './views/groupEdit/viewGroupEdit';
import { StoreGroupEdit } from './stores/storeGroupEdit';

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
	messages: string;
	chat: string;
	chatWS: string;
	postLike: string;
	postUnlike: string;
	postLikeCount: string;
	groups: string;
	group: string;
	groupEdit: string;
	groupJoin: string;
	groupLeave: string;
	profilesSearch: string;
	groupsSearch: string;
	csat: string;
	csatMetrics: string;
	image: string;
}

export interface AppConfig {
	URL: URLInterface;
	homeConfig: HomeConfig;
	signupConfig: SignupFormConfig;
	loginConfig: ILoginFormConfig;
	feedConfig: ViewFeedConfig;
	profileConfig: ViewProfileConfig;
	profileEditConfig: ViewProfileEditConfig;
	messagesConfig: ViewMessagesConfig;
	chatConfig: ViewChatConfig;
	friendsConfig: ViewFriendsConfig;
	groupsConfig: ViewGroupsConfig;
	groupPageConfig: ViewGroupPageConfig;
	createGroupConfig: ViewCreateGroupConfig;
	createPostConfig: ViewCreatePostConfig;
	editPostConfig: ViewPostEditConfig;
	editGroupConfig: ViewGroupEditConfig;
	questionConfig: ViewQuestionConfig;
	metricsConfig: ViewMetricsConfig;
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
	groups: StoreGroups;
	groupPage: StoreGroupPage;
	createPost: StoreCreatePost;
	createGroup: StoreCreateGroup;
	profileEdit: StoreProfileEdit;
	postEdit: StorePostEdit;
	groupEdit: StoreGroupEdit;
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
	private _websocket: WebsocketClient;

	/**
	 * Instance of application
	 *
	 * @param {AppConfig} config - config of application
	 */
	constructor(config: AppConfig) {
		this._config = config;
		this._root = new Root();

		this._websocket = new WebsocketClient(this._config.URL.chatWS);

		const feedView = new ViewFeed(this._config.feedConfig, this._root);
		const profileView = new ViewProfile(
			this._config.profileConfig,
			this._root,
		);
		const friendsView = new ViewFriends(
			this._config.friendsConfig,
			this._root,
		);
		const groupsView = new ViewGroups(
			this._config.groupsConfig,
			this._root,
		);
		const groupPageView = new ViewGroupPage(
			this._config.groupPageConfig,
			this._root,
		);
		const createGroupView = new ViewCreateGroup(
			this._config.createGroupConfig,
			this.root,
		);
		const editGroupView = new ViewGroupEdit(
			this._config.editGroupConfig,
			this.root,
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
		const questionView = new ViewQuestion(
			this._config.questionConfig,
			this._root,
		);
		const metricsView = new ViewMetrics(
			this._config.metricsConfig,
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
				path: PAGE_LINKS.groupPage,
				view: groupPageView,
			},
			{
				path: PAGE_LINKS.signup,
				view: signupView,
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
				path: PAGE_LINKS.chat, // chat должен быть перед messages
				view: chatView,
			},
			{
				path: PAGE_LINKS.messages,
				view: messagesView,
			},
			{
				path: PAGE_LINKS.friends,
				view: friendsView,
			},
			{
				path: PAGE_LINKS.groups,
				view: groupsView,
			},
			{
				path: PAGE_LINKS.createGroup,
				view: createGroupView,
			},
			{
				path: PAGE_LINKS.groupEdit,
				view: editGroupView,
			},
			{
				path: PAGE_LINKS.postEdit,
				view: postEditView,
			},
			{
				path: PAGE_LINKS.question,
				view: questionView,
			},
			{
				path: PAGE_LINKS.metrics,
				view: metricsView,
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
			groups: new StoreGroups(storeHome),
			groupPage: new StoreGroupPage(storeHome),
			messages: new StoreMessages(storeHome),
			chat: new StoreChat(storeHome),
			createPost: new StoreCreatePost(storeHome),
			createGroup: new StoreCreateGroup(storeHome),
			profileEdit: new StoreProfileEdit(storeHome),
			postEdit: new StorePostEdit(storeHome),
			groupEdit: new StoreGroupEdit(storeHome),
		};

		this._stores.app.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.app.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.app.subscribe(ACTION_USER_TYPES.unauthorized);
		this._stores.app.subscribe(ACTION_USER_TYPES.auth);
		this._stores.app.subscribe(ACTION_MENU_TYPES.titleClick);
		this._stores.app.subscribe(ACTION_FEED_TYPES.postsRequestFail);
		this._stores.app.subscribe(ACTION_CHAT_TYPES.goToChat);
		this._stores.app.subscribe(ACTION_CREATE_GROUP_TYPES.goToCreateGroup);
		this._stores.app.subscribe(ACTION_PROFILE_TYPES.getHeaderFail);
		this._stores.app.subscribe(ACTION_PROFILE_EDIT_TYPES.goToProfileEdit);
		this._stores.app.subscribe(ACTION_PROFILE_EDIT_TYPES.requestSuccess);
		this._stores.app.subscribe(ACTION_POST_EDIT_TYPES.goToPostEdit);
		this._stores.app.subscribe(ACTION_POST_EDIT_TYPES.requestSuccess);

		this._stores.home.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.home.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.home.subscribe(ACTION_MENU_TYPES.titleClick);
		this._stores.home.subscribe(ACTION_MENU_TYPES.updateProfileLinkHref);
		this._stores.home.subscribe(ACTION_HEADER_TYPES.logoutClickFail);
		this._stores.home.subscribe(ACTION_HEADER_TYPES.searchResultsSwitch);
		this._stores.home.subscribe(ACTION_MENU_TYPES.openSwitch);
		this._stores.home.subscribe(
			ACTION_PROFILE_TYPES.getYourOwnProfileSuccess,
		);
		this._stores.home.subscribe(ACTION_PROFILE_TYPES.getHeaderSuccess);
		this._stores.home.subscribe(ACTION_PROFILE_TYPES.updateProfile);
		this._stores.home.subscribe(ACTION_PROFILE_TYPES.search);
		this._stores.home.subscribe(ACTION_PROFILE_TYPES.searchSuccess);
		this._stores.home.subscribe(ACTION_PROFILE_TYPES.searchFail);
		this._stores.home.subscribe(ACTION_GROUPS_TYPES.search);
		this._stores.home.subscribe(ACTION_GROUPS_TYPES.searchSuccess);
		this._stores.home.subscribe(ACTION_GROUPS_TYPES.searchFail);

		this._stores.login.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.login.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.login.subscribe(ACTION_USER_TYPES.unauthorized);
		this._stores.login.subscribe(ACTION_USER_TYPES.auth);
		this._stores.login.subscribe(ACTION_HEADER_TYPES.logoutClickSuccess);
		this._stores.login.subscribe(ACTION_FORM_TYPES.formError);
		this._stores.login.subscribe(ACTION_FEED_TYPES.postsRequestFail);

		this._stores.signup.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.signup.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.signup.subscribe(ACTION_FORM_TYPES.formError);

		this._stores.feed.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.feed.subscribe(ACTION_USER_TYPES.auth);
		this._stores.feed.subscribe(ACTION_FEED_TYPES.postsRequest);
		this._stores.feed.subscribe(ACTION_FEED_TYPES.postsRequestSuccess);
		this._stores.feed.subscribe(ACTION_FEED_TYPES.postsRequestFail);
		this._stores.feed.subscribe(ACTION_FEED_TYPES.update);
		this._stores.feed.subscribe(ACTION_POST_TYPES.likeSuccess);
		this._stores.feed.subscribe(ACTION_POST_TYPES.likeFail);

		this._stores.profile.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.profile.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.updateProfile);
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
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.getHeaderSuccess);
		this._stores.profile.subscribe(
			ACTION_PROFILE_EDIT_TYPES.requestSuccess,
		);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.profileRequest);
		this._stores.profile.subscribe(ACTION_PROFILE_TYPES.deletePostSuccess);
		this._stores.profile.subscribe(ACTION_FEED_TYPES.postCreateSuccess);
		this._stores.profile.subscribe(ACTION_FRIENDS_TYPES.acceptSuccess);
		this._stores.profile.subscribe(ACTION_POST_TYPES.likeSuccess);
		this._stores.profile.subscribe(ACTION_POST_TYPES.likeFail);

		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.getFriends);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.subscribeSuccess);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.removeSuccess);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.unsubscribeSuccess);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.acceptSuccess);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.getFriendsSuccess);
		this._stores.friends.subscribe(
			ACTION_FRIENDS_TYPES.getSubscribersSuccess,
		);
		this._stores.friends.subscribe(ACTION_FRIENDS_TYPES.getUsersSuccess);
		this._stores.friends.subscribe(
			ACTION_FRIENDS_TYPES.getSubscriptionsSuccess,
		);

		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.goToMessages);
		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.updateMessages);
		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.requestMessages);
		this._stores.messages.subscribe(
			ACTION_MESSAGES_TYPES.requestMessagesSuccess,
		);
		this._stores.messages.subscribe(
			ACTION_MESSAGES_TYPES.requestMessagesFail,
		);
		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.sendMessage);
		this._stores.messages.subscribe(ACTION_MESSAGES_TYPES.newMessage);

		this._stores.chat.subscribe(ACTION_CHAT_TYPES.goToChat);
		this._stores.chat.subscribe(ACTION_CHAT_TYPES.updateChat);
		this._stores.chat.subscribe(ACTION_CHAT_TYPES.requestChat);
		this._stores.chat.subscribe(ACTION_CHAT_TYPES.requestChatSuccess);
		this._stores.chat.subscribe(ACTION_CHAT_TYPES.requestChatFail);
		this._stores.chat.subscribe(ACTION_CHAT_TYPES.sendMessage);
		this._stores.chat.subscribe(ACTION_MESSAGES_TYPES.sendMessage);
		this._stores.chat.subscribe(ACTION_MESSAGES_TYPES.newMessage);
		this._stores.chat.subscribe(ACTION_PROFILE_TYPES.profileRequestSuccess);

		this._stores.createPost.subscribe(
			ACTION_CREATE_POST_TYPES.updateCreatePost,
		);
		this._stores.createPost.subscribe(ACTION_FEED_TYPES.postCreateSuccess);
		this._stores.createPost.subscribe(ACTION_FEED_TYPES.postCreateFail);
		this._stores.createPost.subscribe(
			ACTION_FEED_TYPES.postGroupCreateSuccess,
		);

		this._stores.createGroup.subscribe(
			ACTION_CREATE_GROUP_TYPES.goToCreateGroup,
		);
		this._stores.createGroup.subscribe(
			ACTION_CREATE_GROUP_TYPES.createSuccess,
		);

		this._stores.groupPage.subscribe(
			ACTION_GROUP_PAGE_TYPES.groupPageRequest,
		);
		this._stores.groupPage.subscribe(
			ACTION_GROUP_PAGE_TYPES.groupPageRequestSuccess,
		);
		this._stores.groupPage.subscribe(
			ACTION_GROUP_PAGE_TYPES.updateGroupPage,
		);
		this._stores.groupPage.subscribe(
			ACTION_GROUP_PAGE_TYPES.deleteGroupSuccess,
		);
		this._stores.groupPage.subscribe(ACTION_GROUP_PAGE_TYPES.postsRequest);
		this._stores.groupPage.subscribe(
			ACTION_GROUP_PAGE_TYPES.postsRequestSuccess,
		);
		this._stores.groupPage.subscribe(ACTION_FEED_TYPES.postsRequestFail);
		this._stores.groupPage.subscribe(
			ACTION_PROFILE_TYPES.deletePostSuccess,
		);
		this._stores.groupPage.subscribe(ACTION_POST_TYPES.likeSuccess);
		this._stores.groupPage.subscribe(ACTION_POST_TYPES.likeFail);

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
		this._stores.profileEdit.subscribe(
			ACTION_PROFILE_TYPES.profileRequestSuccess,
		);

		this._stores.postEdit.subscribe(ACTION_POST_EDIT_TYPES.goToPostEdit);
		this._stores.postEdit.subscribe(ACTION_POST_EDIT_TYPES.requestSuccess);
		this._stores.postEdit.subscribe(ACTION_POST_EDIT_TYPES.requestFail);

		this._stores.groupPage.subscribe(ACTION_APP_TYPES.goTo);

		this._stores.groups.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.groups.subscribe(
			ACTION_GROUPS_TYPES.groupsUnfollowGroupSuccess,
		);
		this._stores.groups.subscribe(
			ACTION_GROUPS_TYPES.groupsFollowGroupSuccess,
		);
		this._stores.groups.subscribe(ACTION_GROUPS_TYPES.getGroupsSuccess);

		this._stores.groupEdit.subscribe(ACTION_APP_TYPES.actionAppInit);
		this._stores.groupEdit.subscribe(ACTION_APP_TYPES.goTo);
		this._stores.groupEdit.subscribe(
			ACTION_GROUP_PAGE_TYPES.groupPageRequestSuccess,
		);
		this._stores.groupEdit.subscribe(ACTION_GROUPS_TYPES.editSuccess);
		this._stores.groupEdit.subscribe(ACTION_GROUPS_TYPES.editFail);

		loginView.register(this._stores.login);

		signupView.register(this._stores.signup);

		feedView.register(this._stores.home);
		feedView.register(this._stores.feed);

		profileView.register(this._stores.profile);
		profileView.register(this._stores.home);

		messagesView.register(this._stores.home);
		messagesView.register(this._stores.messages);

		chatView.register(this._stores.home);
		chatView.register(this._stores.chat);

		createPostView.register(this._stores.home);
		createPostView.register(this._stores.createPost);

		profileEditView.register(this._stores.home);
		profileEditView.register(this._stores.profileEdit);

		friendsView.register(this._stores.home);
		friendsView.register(this._stores.friends);

		groupsView.register(this._stores.home);
		groupsView.register(this._stores.groups);

		groupPageView.register(this._stores.home);
		groupPageView.register(this._stores.groupPage);

		createGroupView.register(this._stores.home);
		createGroupView.register(this._stores.createGroup);

		editGroupView.register(this._stores.home);
		editGroupView.register(this._stores.groupEdit);

		postEditView.register(this._stores.home);
		postEditView.register(this._stores.postEdit);

		questionView.register(this._stores.home);

		metricsView.register(this._stores.home);
	}

	get root(): Root {
		return this._root;
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

	get websocket(): WebsocketClient {
		return this._websocket;
	}

	init() {
		dispatcher.getAction(new ActionProfileGetHeader());
	}
}

export default new App(config);

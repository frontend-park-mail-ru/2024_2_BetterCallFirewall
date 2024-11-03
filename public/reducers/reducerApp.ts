import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import { ACTION_CHAT_TYPES } from '../actions/actionChat';
import { ACTION_CREATE_POST_TYPES } from '../actions/actionCreatePost';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import {
	ACTION_MENU_TYPES,
	ActionMenuLinkClickData,
} from '../actions/actionMenu';
import { ACTION_PROFILE_EDIT_TYPES } from '../actions/actionProfileEdit';
import { ACTION_SIGNUP_TYPES } from '../actions/actionSignup';
import { ACTION_USER_TYPES } from '../actions/actionUser';
import app from '../app';
import { PAGE_LINKS } from '../config';
import { View } from '../views/view';

export const reducerApp = (activeView?: View, action?: Action) => {
	console.log('reducerApp: action:', action);
	const router = app.router;
	if (action) {
		switch (action.type) {
			case ACTION_APP_TYPES.actionAppInit:
				app.inited = true;
				break;
			case ACTION_LOGIN_TYPES.toSignupClick:
				router.goToPage(PAGE_LINKS.signup);
				break;
			case ACTION_SIGNUP_TYPES.toLoginLinkClick:
				router.goToPage(PAGE_LINKS.login);
				break;
			case ACTION_SIGNUP_TYPES.signupClickSuccess:
			case ACTION_LOGIN_TYPES.loginClickSuccess:
			case ACTION_MENU_TYPES.titleClick:
				router.goToPage(PAGE_LINKS.feed);
				break;
			case ACTION_MENU_TYPES.menuLinkClick:
				router.goToPage((action.data as ActionMenuLinkClickData).href);
				break;
			case ACTION_USER_TYPES.unauthorized:
				router.goToPage(PAGE_LINKS.login);
				break;
			case ACTION_CHAT_TYPES.goToChat:
				router.goToPage(PAGE_LINKS.chat);
				break;
			case ACTION_CREATE_POST_TYPES.goToCreatePost:
				router.goToPage(PAGE_LINKS.createPost);
				break;
			case ACTION_PROFILE_EDIT_TYPES.goToProfileEdit:
				router.goToPage(PAGE_LINKS.profileEdit);
				break;
		}
	}
	console.log('activeView:', router.activeView);
	return router.activeView;
};

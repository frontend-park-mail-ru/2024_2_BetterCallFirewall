import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import {
	ACTION_MENU_TYPES,
	ActionMenuLinkClickData,
} from '../actions/actionMenu';
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
				router.activeView?.render();
				break;
			case ACTION_LOGIN_TYPES.actionLoginToSignupClick:
				router.goToPage(PAGE_LINKS.signup);
				break;
			case ACTION_SIGNUP_TYPES.toLoginLinkClick:
				router.goToPage(PAGE_LINKS.login);
				break;
			case ACTION_USER_TYPES.loginClickSuccess:
				router.goToPage(PAGE_LINKS.feed);
				break;
			case ACTION_MENU_TYPES.menuLinkClick:
				router.goToPage((action.data as ActionMenuLinkClickData).href);
				break;
			case ACTION_MENU_TYPES.titleClick:
				router.goToPage(PAGE_LINKS.feed);
				break;
			// case ACTION_PROFILE_TYPES.goToProfile:
			// 	router.goToPage((action.data as ActionGoToProfileData).href);
			// 	break;
		}
	}
	console.log('activeView:', router.activeView);
	return router.activeView;
};

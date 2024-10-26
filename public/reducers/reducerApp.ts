import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import { ACTION_MENU_TYPES } from '../actions/actionMenu';
import { ACTION_SIGNUP_TYPES } from '../actions/actionSignup';
import { ACTION_USER_TYPES } from '../actions/actionUser';
import app from '../app';
import { PAGE_LINKS } from '../config';
import { View } from '../views/view';

export const reducerApp = (activeView?: View, action?: Action) => {
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
			case ACTION_MENU_TYPES.titleClick:
				router.goToPage(PAGE_LINKS.feed);
				break;
		}
	}
	return router.activeView;
};

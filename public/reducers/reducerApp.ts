import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
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
		}
	}
	return router.activeView;
};

import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import {
	ACTION_MENU_TYPES,
	ActionUpdateProfileLinkHrefData,
} from '../actions/actionMenu';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileSuccessData,
} from '../actions/actionProfile';
import app from '../app';
import { IMenuConfig } from '../components/Menu/Menu';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState: IMenuConfig = deepClone(config.homeConfig.menu);

export const reducerMenu = (
	state: IMenuConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	if (action) {
		switch (action.type) {
			case ACTION_PROFILE_TYPES.updateProfile:
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
				Object.keys(newState.links).forEach((key) => {
					const link = newState.links[key];
					link.active = app.router.path === link.href;
				});
				break;
			case ACTION_MENU_TYPES.titleClick:
				break;
			case ACTION_MENU_TYPES.updateProfileLinkHref:
				newState.links.profile.href = (
					action.data as ActionUpdateProfileLinkHrefData
				).href;
				break;
			case ACTION_PROFILE_TYPES.getYourOwnProfileSuccess: {
				const actionData =
					action.data as ActionProfileGetYourOwnProfileSuccessData;
				newState.links.profile.href = `/${actionData.profile.id}`;
				break;
			}
		}
	}
	return newState;
};

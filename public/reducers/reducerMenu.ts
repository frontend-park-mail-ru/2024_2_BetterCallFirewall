import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import {
	ACTION_MENU_TYPES,
	ActionMenuOpenSwitchData,
	ActionUpdateProfileLinkHrefData,
} from '../actions/actionMenu';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileSuccessData,
} from '../actions/actionProfile';
import app from '../app';
import { MenuConfig } from '../components/Menu/Menu';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState: MenuConfig = deepClone(config.homeConfig.menu);

export const reducerMenu = (
	state: MenuConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	if (action) {
		switch (action.type) {
			case ACTION_PROFILE_TYPES.updateProfile:
			case ACTION_APP_TYPES.goTo:
				Object.entries(newState.links).forEach(([, linkConfig]) => {
					linkConfig.active = app.router.path === linkConfig.href;
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
			case ACTION_MENU_TYPES.openSwitch:
				newState.isShow = (
					action.data as ActionMenuOpenSwitchData
				).show;
		}
	}
	return newState;
};

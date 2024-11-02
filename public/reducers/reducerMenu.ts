import { Action } from '../actions/action';
import {
	ACTION_MENU_TYPES,
	ActionUpdateProfileLinkHrefData,
} from '../actions/actionMenu';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileSuccessData,
} from '../actions/actionProfile';
import { IMenuConfig } from '../components/Menu/Menu';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState: IMenuConfig = deepClone(config.homeConfig.menu);

export const reducerMenu = (state?: IMenuConfig, action?: Action) => {
	if (!state) {
		return initialState;
	}
	const newState = deepClone(state);
	if (action) {
		switch (action.type) {
			case ACTION_MENU_TYPES.menuLinkClick:
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

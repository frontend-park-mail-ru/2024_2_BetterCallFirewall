import { Action } from '../actions/action';
import { ACTION_MENU_TYPES } from '../actions/actionMenu';
import { IMenuConfig } from '../components/Menu/Menu';
import config from '../config';
import deepClone from '../modules/deepClone';

const initialState: IMenuConfig = deepClone(config.homeConfig.menu);

export const reducerMenu = (state?: IMenuConfig, action?: Action) => {
	if (!state) {
		return initialState;
	}
	const newState = state; // Потом поменять на let
	if (action) {
		switch (action.type) {
			case ACTION_MENU_TYPES.menuLinkClick:
				break;
		}
	}
	return newState;
};

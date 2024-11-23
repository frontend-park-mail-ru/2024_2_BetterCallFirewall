import { Action } from '../actions/action';
import {
	ACTION_HEADER_TYPES,
	ActionHeaderSearchResultsSwitchData,
} from '../actions/actionHeader';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetHeaderSuccessData,
} from '../actions/actionProfile';
import { HeaderConfig } from '../components';
import config from '../config';
import { headerResponseToHeaderConfig } from '../models/header';
import deepClone from '../modules/deepClone';

const initialState = deepClone(config.homeConfig.main.header);

export const reducerHeader = (
	state: HeaderConfig = initialState,
	action?: Action,
): HeaderConfig => {
	if (!action) {
		return state;
	}
	let newState = deepClone(state);
	switch (action.type) {
		case ACTION_PROFILE_TYPES.getHeaderSuccess: {
			const actionData = action.data as ActionProfileGetHeaderSuccessData;
			newState = headerResponseToHeaderConfig(
				newState,
				actionData.headerResponse,
			);
			break;
		}
		case ACTION_HEADER_TYPES.searchResultsSwitch:
			newState.showSearchResults = (
				action.data as ActionHeaderSearchResultsSwitchData
			).show;
			return newState;
	}
	return newState;
};

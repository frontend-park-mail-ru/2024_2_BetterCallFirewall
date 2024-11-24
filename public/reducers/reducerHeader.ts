import { Action } from '../actions/action';
import {
	ACTION_HEADER_TYPES,
	ActionHeaderSearchResultsSwitchData,
} from '../actions/actionHeader';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetHeaderSuccessData,
	ActionProfileSearchData,
	ActionProfileSearchSuccessData,
} from '../actions/actionProfile';
import { HeaderConfig } from '../components';
import config from '../config';
import { headerResponseToHeaderConfig } from '../models/header';
import { shortProfileResponseToSearchResultConfig } from '../models/profile';
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
		case ACTION_PROFILE_TYPES.search:
			if (!(action.data as ActionProfileSearchData).lastId) {
				newState.profilesSearch = [];
			}
			return newState;
		case ACTION_PROFILE_TYPES.searchSuccess: {
			const actionData = action.data as ActionProfileSearchSuccessData;
			newState.profilesSearch = newState.profilesSearch.concat(
				actionData.profilesResponses.map((profileResponse) => {
					return shortProfileResponseToSearchResultConfig(
						profileResponse,
					);
				}),
			);
			return newState;
		}
	}
	return newState;
};

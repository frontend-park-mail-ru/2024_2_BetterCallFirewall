import { Action } from '../actions/action';
import {
	ActionGroupSearchFail,
	ActionGroupsSearchSuccess,
} from '../actions/actionGroups';
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
import { shortGroupResponseToSearchResultConfig } from '../models/group';
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
			newState.showSearchResults = true;
			return newState;
		}
		case ACTION_PROFILE_TYPES.searchFail:
			newState.showSearchResults = true;
			return newState;
	}
	switch (true) {
		case action instanceof ActionGroupsSearchSuccess:
			newState.groupsSearch = newState.groupsSearch.concat(
				action.data.groupsResponses.map((groupResponse) => {
					return shortGroupResponseToSearchResultConfig(
						groupResponse,
					);
				}),
			);
			newState.showSearchResults = true;
			return newState;
		case action instanceof ActionGroupSearchFail:
			newState.showSearchResults = true;
			return newState;
	}
	return newState;
};

import { Action } from '../actions/action';
import {
	ActionGroupsSearchFail,
	ActionGroupsSearchSuccess,
} from '../actions/actionGroups';
import {
	ACTION_HEADER_TYPES,
	ActionHeaderSearchResultsSwitchData,
} from '../actions/actionHeader';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetHeaderSuccessData,
	ActionProfileSearchSuccessData,
} from '../actions/actionProfile';
import { ActionProfileEditRequestSuccess } from '../actions/actionProfileEdit';
import { HeaderConfig } from '../components';
import config from '../config';
import { shortGroupResponseToSearchResultConfig } from '../models/group';
import { headerResponseToHeaderConfig } from '../models/header';
import {
	shortProfileResponseToSearchResultConfig,
	toHeaderProfile,
} from '../models/profile';
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
		case ACTION_PROFILE_TYPES.searchSuccess: {
			const actionData = action.data as ActionProfileSearchSuccessData;
			newState.searchInfoMessage = '';
			newState.profilesSearch = actionData.profilesResponses.map(
				(profileResponse) => {
					return shortProfileResponseToSearchResultConfig(
						profileResponse,
					);
				},
			);
			if (
				!newState.groupsSearch.length &&
				!newState.profilesSearch.length
			) {
				newState.searchInfoMessage = 'Ничего не найдено';
			}
			newState.showSearchResults = true;
			return newState;
		}
		case ACTION_PROFILE_TYPES.searchFail:
			newState.searchInfoMessage = 'Что-то пошло не так';
			newState.showSearchResults = true;
			return newState;
	}
	switch (true) {
		case action instanceof ActionGroupsSearchSuccess:
			newState.searchInfoMessage = '';
			newState.groupsSearch = action.data.groupsResponses.map(
				(groupResponse) => {
					return shortGroupResponseToSearchResultConfig(
						groupResponse,
					);
				},
			);
			if (
				!newState.groupsSearch.length &&
				!newState.profilesSearch.length
			) {
				newState.searchInfoMessage = 'Ничего не найдено';
			}
			newState.showSearchResults = true;
			return newState;
		case action instanceof ActionGroupsSearchFail:
			if (!newState.profilesSearch.length) {
				newState.searchInfoMessage = 'Что-то пошло не так';
			}
			newState.showSearchResults = true;
			return newState;
		case action instanceof ActionProfileEditRequestSuccess:
			newState.profile = toHeaderProfile(action.data.profileResponse);
			return newState;
	}
	return newState;
};

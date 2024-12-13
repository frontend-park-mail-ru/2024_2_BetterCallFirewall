import { Action } from '../actions/action';
import {
	ACTION_STICKERS_TYPES,
	ActionStickersGetStickersSuccessData,
} from '../actions/actionStickers';
import config from '../config';
import { toStickersConfig } from '../models/sticker';
import deepClone from '../modules/deepClone';
import { ViewStickersConfig } from '../views/stickers/viewStickers';

const initialState = deepClone(config.stickersConfig);

export const reducerStickers = (
	state: ViewStickersConfig = initialState,
	action?: Action,
): ViewStickersConfig => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_STICKERS_TYPES.getStickers:
			newState.stickers.stickersConfig = [];
			return newState;
		case ACTION_STICKERS_TYPES.getStickersSuccess: {
			const actionData =
				action.data as ActionStickersGetStickersSuccessData;
			newState.stickers.stickersConfig = actionData.stickers.map(
				(sticker) => {
					return toStickersConfig(sticker);
				},
			);
			return newState;
		}
	}
	return newState;
};

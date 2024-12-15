import { Action } from '../actions/action';
import {
	ACTION_STICKERS_TYPES,
	ActionStickersGetSuccessData,
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
		case ACTION_STICKERS_TYPES.get:
			newState.stickers.stickersConfig = [];
			return newState;
		case ACTION_STICKERS_TYPES.getSuccess: {
			const actionData = action.data as ActionStickersGetSuccessData;
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

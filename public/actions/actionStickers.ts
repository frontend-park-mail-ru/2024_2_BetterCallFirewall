import { StickerResponse } from '../models/sticker';
import { Action, ActionType } from './action';

export const ACTION_STICKERS_TYPES = {
	getStickers: 'actionStickersGetStickers',
	getStickersSuccess: 'actionStickersGetStickersSuccess',
};

export class ActionStickersGetStickers implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_STICKERS_TYPES.getStickers;
		this.data = {};
	}
}

export interface ActionStickersGetStickersSuccessData {
	stickers: StickerResponse[];
}

export class ActionStickersGetStickersSuccess implements Action {
	type: ActionType;
	data: ActionStickersGetStickersSuccessData;

	constructor(data: ActionStickersGetStickersSuccessData) {
		this.type = ACTION_STICKERS_TYPES.getStickersSuccess;
		this.data = data;
	}
}

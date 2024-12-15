import { StickerPayload, StickerResponse } from '../models/sticker';
import { Action, ActionType } from './action';

export const ACTION_STICKERS_TYPES = {
	get: 'actionStickersGet',
	getSuccess: 'actionStickersGetSuccess',
	getFail: 'actionStickersGetFail',
	create: 'actionStickerCreate',
	createSuccess: 'actionStickerCreateSuccess',
	createFail: 'actionStickerCreateFail',
};

export class ActionStickersGet implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_STICKERS_TYPES.get;
		this.data = {};
	}
}

export interface ActionStickersGetSuccessData {
	stickers: StickerResponse[];
}

export class ActionStickersGetSuccess implements Action {
	type: ActionType;
	data: ActionStickersGetSuccessData;

	constructor(stickers: StickerResponse[]) {
		this.type = ACTION_STICKERS_TYPES.getSuccess;
		this.data = { stickers };
	}
}
export class ActionStickersGetFail implements Action {
	type: string = ACTION_STICKERS_TYPES.getFail;
	data: object = {};
}

export class ActionStickersCreate implements Action {
	type: string = ACTION_STICKERS_TYPES.create;
	data: { payload: StickerPayload };

	constructor(payload: StickerPayload) {
		this.data = { payload };
	}
}
export class ActionStickerCreateSuccess implements Action {
	type: string = ACTION_STICKERS_TYPES.createSuccess;
	data: object = {};
}
export class ActionStickerCreateFail implements Action {
	type: string = ACTION_STICKERS_TYPES.createSuccess;
	data: object = {};
}

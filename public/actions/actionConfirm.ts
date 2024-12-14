import { ConfirmConfig } from '../components/Confirm/Confirm';
import { Action } from './action';

export const ACTION_CONFIRM_TYPES = {
	open: 'actionConfirmOpen',
	close: 'actionConfirmClose',
};

export class ActionConfirmOpen implements Action {
	type: string = ACTION_CONFIRM_TYPES.open;
	data: { config: ConfirmConfig };

	constructor(config: ConfirmConfig) {
		this.data = { config };
	}
}
export class ActionConfirmClose implements Action {
	type: string = ACTION_CONFIRM_TYPES.close;
	data: object = {};
}

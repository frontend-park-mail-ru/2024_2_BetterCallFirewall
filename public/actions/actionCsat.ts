import { CsatResult } from '../models/csatResult';
import { Action, ActionType } from './action';

export const ACTION_CSAT_TYPES = {
	sendSuccess: 'actionCsatSendSuccess',
	metrics: 'actionCsatMetrics',
};

export class ActionCsatSendSuccess implements Action {
	type: ActionType = ACTION_CSAT_TYPES.sendSuccess;
	data: object = {};
}

export interface ActionCsatMetricsData {
	csatResult: CsatResult;
}

export class ActionCsatMetrics implements Action {
	type: ActionType = ACTION_CSAT_TYPES.metrics;
	data: ActionCsatMetricsData;

	constructor(csatResult: CsatResult) {
		this.data = { csatResult };
	}
}

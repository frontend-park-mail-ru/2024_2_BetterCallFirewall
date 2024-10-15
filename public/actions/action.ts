export type ActionType = string;

export interface Action {
	type: ActionType;
	data: object;
}

export type ActionTypeList = Record<string, ActionType>;

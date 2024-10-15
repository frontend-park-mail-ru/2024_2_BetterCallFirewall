import { Action, ActionType } from '../actions/action';

export interface Store {
	handleAction(action: Action): void;
	subscribe(actionType: ActionType): void;
}

import { Action, ActionType } from '../actions/action';
import { HOME_ACTION_TYPES } from '../actions/actionHome';
import { Store } from './store';
import dispatcher from '../dispatcher/dispatcher';

export class StoreHome implements Store {
	handleAction(action: Action) {
		switch (action.type) {
			case HOME_ACTION_TYPES.menuLinkClick:
				break;
			default:
				return;
		}
	}
	subscribe(actionType: ActionType) {
		dispatcher.addListener(this, actionType);
	}
}

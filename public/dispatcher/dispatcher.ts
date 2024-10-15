import { Action, ActionType } from '../actions/action';
import { Store } from '../stores/store';

export type SubscribedStores = Record<ActionType, Store[]>;

class Dispatcher {
	private subscribed: SubscribedStores = {};

	getAction(action: Action) {
		this.dispatch(action);
	}

	dispatch(action: Action) {
		const stores = this.subscribed[action.type];
		if (stores) {
			stores.forEach((store) => store.handleAction(action));
		}
	}

	addListener(store: Store, actionType: ActionType) {
		this.subscribed[actionType].push(store);
	}
}

export default new Dispatcher();

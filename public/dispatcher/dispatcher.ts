import { Action, ActionType } from '../actions/action';
import { Router } from '../router/router';
import { Store } from '../stores/store';

export type SubscribedStores = Record<ActionType, Store[]>;

export class Dispatcher {
	private subscribed: SubscribedStores = {};
	private _router?: Router;

	getAction(action: Action) {
		this.dispatch(action);
	}

	dispatch(action: Action) {
		const stores = this.subscribed[action.type];
		// console.log(stores);
		if (stores) {
			stores.forEach((store) => store.handleAction(action));
		}
	}

	addListener(store: Store, actionType: ActionType) {
		const subscribedStores = this.subscribed[actionType];
		if (!subscribedStores) {
			this.subscribed[actionType] = [];
		}
		this.subscribed[actionType].push(store);
	}

	addRouter(router: Router) {
		this._router = router;
	}
}

export default new Dispatcher();

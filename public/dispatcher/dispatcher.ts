import { Action, ActionType } from '../actions/action';
import { ActionCommentRequest } from '../actions/actionComment';
import {
	ActionPostCommentsOpenSwitch,
	ActionPostCommentsSortChange,
} from '../actions/actionPost';
import api from '../api/api';
import app from '../app';
import { Router } from '../router/router';
import { Store } from '../stores/store';

export type SubscribedStores = Record<ActionType, Store[]>;

export class Dispatcher {
	private subscribed: SubscribedStores = {};
	private _router?: Router;

	getAction(action: Action) {
		this._handleAction(action);
		this.dispatch(action);
	}

	dispatch(action: Action) {
		console.log('dispatcher: action:', action);
		const stores = this.subscribed[action.type];
		console.log('dispatcher: to stores:', stores);
		if (stores) {
			stores.forEach((store) => {
				store.handleAction(action);
			});
		}
		api.handleAction(action);
		app.websocket.handleAction(action);
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

	private _handleAction(action: Action) {
		switch (true) {
			case action instanceof ActionPostCommentsOpenSwitch:
				if (action.data.show) {
					this.dispatch(
						new ActionCommentRequest(
							action.data.postId,
							action.data.sort,
						),
					);
				}
				break;
			case action instanceof ActionPostCommentsSortChange:
				this.dispatch(
					new ActionCommentRequest(
						action.data.postId,
						action.data.sort,
					),
				);
		}
	}
}

export default new Dispatcher();

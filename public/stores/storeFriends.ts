import { Action } from '../actions/action';
import { reducerFriends } from '../reducers/reducerFriends';
import { ViewFriends, ViewFriendsConfig } from '../views/friends/viewFriends';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeFriends extends ChangeHome {
	data: ViewFriendsConfig;
}

export class StoreFriends extends BaseStore implements Store {
	protected _registeredViews: ViewFriends[] = [];
	private _state: ViewFriendsConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerFriends();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerFriends(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewFriends): void {
		this._addView(view);
	}

	removeView(view: ViewFriends): void {
		this._removeView(view);
	}
}

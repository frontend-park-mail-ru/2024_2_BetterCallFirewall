import { Action } from '../actions/action';
import { reducerFeed } from '../reducers/reducerFeed';
import { ViewFeed, ViewFeedConfig } from '../views/feed/viewFeed';
import { BaseStore, Store } from './store';
import { StoreHome } from './storeHome';

export class StoreFeed extends BaseStore implements Store {
	protected _registeredView?: ViewFeed;
	private _state: ViewFeedConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerFeed();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerFeed(this._state, action);
		if (this._registeredView?.active) {
			this._registeredView.updateViewHome(this._state);
		}
	}

	addView(view: ViewFeed): void {
		this._registeredView = view;
	}

	removeView(): void {
		this._registeredView = undefined;
	}
}

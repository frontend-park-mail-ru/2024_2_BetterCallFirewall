import { Action } from '../actions/action';
import { reducerFeed } from '../reducers/reducerFeed';
import { ViewFeed, ViewFeedConfig } from '../views/feed/viewFeed';
import { BaseStore, Change, Store } from './store';
import { StoreHome } from './storeHome';

export interface ChangeFeed extends Change {
	data: ViewFeedConfig;
}

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
		console.log('storeFeed: state before:', this._state.posts);
		this._state = reducerFeed(this._state, action);
		console.log('storeFeed: state after:', this._state.posts);
		if (this._registeredView?.active) {
			this._registeredView.handleChange({
				type: action.type,
				data: this._state,
			});
		}
	}

	addView(view: ViewFeed): void {
		this._registeredView = view;
	}

	removeView(): void {
		this._registeredView = undefined;
	}
}

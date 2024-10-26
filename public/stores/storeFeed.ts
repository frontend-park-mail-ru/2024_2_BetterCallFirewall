import { Action } from '../actions/action';
import { IHomeConfig } from '../app';
import { reducerFeed } from '../reducers/reducerFeed';
import { ViewFeed } from '../views/feed/viewFeed';
import { BaseStore, Store } from './store';

export class StoreFeed extends BaseStore implements Store {
	private _registeredView?: ViewFeed;
	private _state: IHomeConfig;

	constructor() {
		super();
		this._state = reducerFeed();
	}

	handleAction(action: Action): void {
		this._state = reducerFeed(this._state, action);
		this._registeredView?.update(this._state);
	}

	addView(view: ViewFeed): void {
		this._registeredView = view;
	}

	removeView(): void {
		this._registeredView = undefined;
	}
}

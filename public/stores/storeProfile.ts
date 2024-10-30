import { Action } from '../actions/action';
import { reducerHome } from '../reducers/reducerHome';
import { reducerProfile } from '../reducers/reducerProfile';
import { ViewProfile, ViewProfileConfig } from '../views/profile/viewProfile';
import { BaseStore, Store } from './store';

export class StoreProfile extends BaseStore implements Store {
	private _state: ViewProfileConfig;
	protected _registeredViews: ViewProfile[] = [];

	constructor() {
		super();
		this._state = reducerProfile();
	}

	handleAction(action: Action): void {
		this._state.home = reducerHome(this._state.home, action);
		this._state = reducerProfile(this._state, action);
		console.log('storeProfile: state:', this._state);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.updateViewProfile(this._state);
			}
		});
	}

	addView(view: ViewProfile): void {
		this._addView(view);
	}

	removeView(view: ViewProfile): void {
		this._removeView(view);
	}
}

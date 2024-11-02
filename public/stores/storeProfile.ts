import { Action } from '../actions/action';
import { reducerProfile } from '../reducers/reducerProfile';
import { ViewProfile, ViewProfileConfig } from '../views/profile/viewProfile';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeProfile extends ChangeHome {
	data: ViewProfileConfig;
}

export class StoreProfile extends BaseStore implements Store {
	protected _registeredViews: ViewProfile[] = [];
	private _state: ViewProfileConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerProfile();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerProfile(this._state, action);
		this._registeredViews.forEach((view) => {
			view.handleChange({ type: action.type, data: this._state });
		});
	}

	addView(view: ViewProfile): void {
		this._addView(view);
	}

	removeView(view: ViewProfile): void {
		this._removeView(view);
	}
}

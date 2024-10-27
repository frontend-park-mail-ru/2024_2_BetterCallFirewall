import { Action } from '../actions/action';
import { IProfileConfig } from '../components/Profile/Profile';
import { reducerProfile } from '../reducers/reducerProfile';
import { ViewProfile } from '../views/profile/profileView';
import { BaseStore, Store } from './store';

export class StoreProfile extends BaseStore implements Store {
	private _state: IProfileConfig;
	protected _registeredViews: ViewProfile[] = [];

	constructor(data: IProfileConfig) {
		super();
		this._state = data;
	}

	handleAction(action: Action): void {
		this._registeredViews.forEach((view) => {
			if (view.active) {
				this._state = reducerProfile(this._state, action);
				view.updateProfile(this._state);
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

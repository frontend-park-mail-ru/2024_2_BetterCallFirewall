import { Action } from '../actions/action';
import { reducerUser } from '../reducers/reducerUser';
import { View } from '../views/view';
import { BaseStore, Store } from './store';

export interface UserState {
	profileHref: string;
}

export class StoreUser extends BaseStore implements Store {
	protected _state: UserState;

	constructor() {
		super();
		this._state = reducerUser();
	}

	get profileHref(): string {
		this._state.profileHref = 'lukeskywalker'; // tmp
		return this._state.profileHref;
	}

	handleAction(action: Action): void {
		console.log('storeUser: action:', action);
	}

	addView(view: View): void {
		this._addView(view);
	}

	removeView(view: View): void {
		this._removeView(view);
	}
}

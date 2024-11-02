import { Action } from '../actions/action';
import { ILoginFormConfig } from '../components';
import { reducerLogin } from '../reducers/reducerLogin';
import { ViewLogin } from '../views/login/viewLogin';
import { BaseStore, Change, Store } from './store';

export interface ChangeLogin extends Change {
	data: ILoginFormConfig;
}

export class StoreLogin extends BaseStore implements Store {
	private _state: ILoginFormConfig;
	protected _registeredViews: ViewLogin[] = [];

	constructor() {
		super();
		this._state = reducerLogin();
	}

	handleAction(action: Action): void {
		this._state = reducerLogin(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				// view.update(this._state);
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewLogin): void {
		this._addView(view);
	}

	removeView(view: ViewLogin): void {
		this._removeView(view);
	}
}

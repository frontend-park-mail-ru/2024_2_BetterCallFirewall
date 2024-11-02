import { Action } from '../actions/action';
import { ISignupFormConfig } from '../components';
import { reducerSignup } from '../reducers/reducerSignup';
import { ViewSignup } from '../views/signup/viewSignup';
import { BaseStore, Change, Store } from './store';

export interface ChangeSignup extends Change {
	data: ISignupFormConfig;
}

export class StoreSignup extends BaseStore implements Store {
	private _state: ISignupFormConfig;
	protected _registeredViews: ViewSignup[] = [];

	constructor() {
		super();
		this._state = reducerSignup();
	}

	handleAction(action: Action): void {
		this._state = reducerSignup(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				// view.update(this._state);
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewSignup): void {
		this._addView(view);
	}

	removeView(view: ViewSignup): void {
		this._removeView(view);
	}
}

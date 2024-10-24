import { Action } from '../actions/action';
import { ISignupFormConfig } from '../components';
import { reducerSignup } from '../reducers/reducerSignup';
import { ViewSignup } from '../views/signup/viewSignup';
import { BaseStore, Store } from './store';

export class StoreSignup extends BaseStore implements Store {
	private _state: ISignupFormConfig;
	protected _registeredViews: ViewSignup[] = [];

	constructor() {
		super();
		this._state = reducerSignup() as ISignupFormConfig;
	}

	handleAction(action: Action): void {
        console.log('update sugnup');
		this._registeredViews.forEach((view) => {
			if (view.active) {
				this._state = reducerSignup(this._state, action) as ISignupFormConfig;
				view.update(this._state);
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

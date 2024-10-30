import { Action } from '../actions/action';
import { IHomeConfig } from '../app';
import { reducerHome } from '../reducers/reducerHome';
import { ViewHome } from '../views/home/viewHome';
import { BaseStore, Store } from './store';

export class StoreHome extends BaseStore implements Store {
	private _state: IHomeConfig;
	protected _registeredViews: ViewHome[] = [];

	constructor() {
		super();
		this._state = reducerHome();
	}

	handleAction(action: Action): void {
		this._state = reducerHome(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.updateViewHome(this._state);
			}
		});
	}

	addView(view: ViewHome): void {
		this._addView(view);
	}

	removeView(view: ViewHome): void {
		this._removeView(view);
	}
}

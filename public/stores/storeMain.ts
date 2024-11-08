import { Action } from '../actions/action';
import { reducerMain } from '../reducers/reducerMain';
import { MainConfig, ViewHome } from '../views/home/viewHome';
import { BaseStore, Store } from './store';

export class StoreMain extends BaseStore implements Store {
	private _state: MainConfig;
	protected _registeredViews: ViewHome[] = [];

	constructor() {
		super();
		this._state = reducerMain();
	}

	get state(): MainConfig {
		return this._state;
	}

	handleAction(action: Action): void {
		this._state = reducerMain(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.updateMain(this._state);
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

import { Action } from '../actions/action';
import deepClone from '../modules/deepClone';
import { reducerHome } from '../reducers/reducerHome';
import { HomeConfig, ViewHome } from '../views/home/viewHome';
import { BaseStore, Change, Store } from './store';

export interface ChangeHome extends Change {
	data: HomeConfig;
}

export class StoreHome extends BaseStore implements Store {
	private _state: HomeConfig;
	protected _registeredViews: ViewHome[] = [];

	constructor() {
		super();
		this._state = reducerHome();
	}

	get state(): HomeConfig {
		return this._state;
	}

	handleAction(action: Action): void {
		this._state = reducerHome(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({
					type: action.type,
					data: deepClone(this._state),
				});
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

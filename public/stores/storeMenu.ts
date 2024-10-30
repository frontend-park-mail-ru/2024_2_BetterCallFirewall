import { Action } from '../actions/action';
import { IMenuConfig } from '../components';
import { reducerMenu } from '../reducers/reducerMenu';
import { ViewMenu } from '../views/home/viewHome';
import { BaseStore, Store } from './store';

export class StoreMenu extends BaseStore implements Store {
	private _state: IMenuConfig;
	protected _registeredViews: ViewMenu[] = [];

	constructor() {
		super();
		this._state = reducerMenu();
	}

	get state(): IMenuConfig {
		return this._state;
	}

	handleAction(action: Action): void {
		this._state = reducerMenu(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.updateMenu(this._state);
			}
		});
	}

	addView(view: ViewMenu): void {
		this._addView(view);
	}

	removeView(view: ViewMenu): void {
		this._removeView(view);
	}
}

import { Action } from '../actions/action';
import { IMenuConfig } from '../components';
import { reducerMenu } from '../reducers/reducerMenu';
import { ViewMenu } from '../views/home/viewHome';
import { BaseStore, Store } from './store';

export class StoreMenu extends BaseStore implements Store {
	private _state: IMenuConfig;
	protected _registeredViews: ViewMenu[] = [];

	constructor(data: IMenuConfig) {
		super();
		this._state = data;
	}

	handleAction(action: Action): void {
		this._registeredViews.forEach((view) => {
			if (view.active) {
				this._state = reducerMenu(this._state, action);
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

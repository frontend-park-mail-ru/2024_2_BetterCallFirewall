import { Action } from '../actions/action';
import { IHeaderConfig } from '../components';
import { reducerHeader } from '../reducers/reducerHeader';
import { ViewHeader } from '../views/home/viewHome';
import { View } from '../views/view';
import { BaseStore, Store } from './store';

export class StoreHeader extends BaseStore implements Store {
	private _state: IHeaderConfig;
	protected _registeredViews: ViewHeader[] = [];

	constructor() {
		super();
		this._state = reducerHeader();
	}

	handleAction(action: Action): void {
		this._state = reducerHeader(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.updateHeader(this._state);
			}
		});
	}

	addView(view: View): void {
		this._addView(view);
	}

	removeView(view: View): void {
		this._removeView(view);
	}
}

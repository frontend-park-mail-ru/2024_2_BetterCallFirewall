import { Action } from '../actions/action';
import { reducerApp } from '../reducers/reducerApp';
import { View } from '../views/view';
import { BaseStore, Store } from './store';

export class StoreApp extends BaseStore implements Store {
	private _activeView?: View;

	handleAction(action: Action): void {
		this._activeView = reducerApp(this._activeView, action);
	}

	addView(view: View): void {
		this._addView(view);
	}

	removeView(view: View): void {
		this._removeView(view);
	}
}

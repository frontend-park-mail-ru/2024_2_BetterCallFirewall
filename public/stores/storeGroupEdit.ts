import { Action } from '../actions/action';
import { reducerGroupEdit } from '../reducers/reducerGroupEdit';
import { ViewGroupEdit, ViewGroupEditConfig } from '../views/groupEdit/viewGroupEdit';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeGroupEdit extends ChangeHome {
	data: ViewGroupEditConfig;
}

export class StoreGroupEdit extends BaseStore implements Store {
	protected _registeredViews: ViewGroupEdit[] = [];
	private _state: ViewGroupEditConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerGroupEdit();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerGroupEdit(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewGroupEdit): void {
		this._addView(view);
	}

	removeView(view: ViewGroupEdit): void {
		this._removeView(view);
	}
}

import { Action } from '../actions/action';
import deepClone from '../modules/deepClone';
import { reducerGroupPage } from '../reducers/reducerGroupPage';
import {
	ViewGroupPage,
	ViewGroupPageConfig,
} from '../views/groupPage/viewGroupPage';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeGroupPage extends ChangeHome {
	data: ViewGroupPageConfig;
}

export class StoreGroupPage extends BaseStore implements Store {
	protected _registeredViews: ViewGroupPage[] = [];
	private _state: ViewGroupPageConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerGroupPage();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = Object.assign(
			deepClone(this._state),
			this._storeHome.state,
		);
		this._state = reducerGroupPage(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewGroupPage): void {
		this._addView(view);
	}

	removeView(view: ViewGroupPage): void {
		this._removeView(view);
	}
}

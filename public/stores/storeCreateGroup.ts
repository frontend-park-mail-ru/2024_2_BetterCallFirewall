import { Action } from '../actions/action';
import { reducerCreateGroup } from '../reducers/reducerCreateGroup';
import {
	ViewCreateGroup,
	ViewCreateGroupConfig,
} from '../views/createGroup/viewCreateGroup';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeCreateGroup extends ChangeHome {
	data: ViewCreateGroupConfig;
}

export class StoreCreateGroup extends BaseStore implements Store {
	private _state: ViewCreateGroupConfig;
	protected _registeredViews: ViewCreateGroup[] = [];
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerCreateGroup();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerCreateGroup(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewCreateGroup): void {
		this._addView(view);
	}

	removeView(view: ViewCreateGroup): void {
		this._removeView(view);
	}
}

import { Action } from "../actions/action";
import { reducerGroups } from "../reducers/reducerGroups";
import { ViewGroups, ViewGroupsConfig } from "../views/groups/viewGroups";
import { BaseStore, Store } from "./store";
import { ChangeHome, StoreHome } from "./storeHome";

export interface ChangeGroups extends ChangeHome {
	data: ViewGroupsConfig;
}

export class StoreGroups extends BaseStore implements Store {
	protected _registeredViews: ViewGroups[] = [];
	private _state: ViewGroupsConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerGroups();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerGroups(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewGroups): void {
		this._addView(view);
	}

	removeView(view: ViewGroups): void {
		this._removeView(view);
	}
}

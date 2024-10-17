import { Action } from '../actions/action';
import { ACTION_MENU_TYPES } from '../actions/actionMenu';
import { IMenuConfig } from '../components';
import { ViewMenu } from '../views/view';
import { BasicStore, Store } from './store';

export class StoreMenu extends BasicStore implements Store {
	private _data: IMenuConfig;
	protected _registeredViews: ViewMenu[] = [];

	constructor(data: IMenuConfig) {
		super();
		this._data = data;
	}

	handleAction(action: Action): void {
		this._registeredViews.forEach((view) => {
			if (view.active) {
				switch (action.type) {
					case ACTION_MENU_TYPES.menuLinkClick:
						break;
				}
				view.updateMenu(this._data);
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

import { Action } from '../actions/action';
import { reducerStickers } from '../reducers/reducerStickers';
import {
	ViewStickers,
	ViewStickersConfig,
} from '../views/stickers/viewStickers';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeStickers extends ChangeHome {
	data: ViewStickersConfig;
}

export class StoreStickers extends BaseStore implements Store {
	protected _registeredViews: ViewStickers[] = [];
	private _state: ViewStickersConfig;
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerStickers();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerStickers(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewStickers): void {
		this._addView(view);
	}

	removeView(view: ViewStickers): void {
		this._removeView(view);
	}
}

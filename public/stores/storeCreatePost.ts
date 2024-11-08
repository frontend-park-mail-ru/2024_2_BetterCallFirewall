import { Action } from '../actions/action';
import { reducerCreatePost } from '../reducers/reducerCreatePost';
import {
	ViewCreatePost,
	ViewCreatePostConfig,
} from '../views/createPost/viewCreatePost';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeCreatePost extends ChangeHome {
	data: ViewCreatePostConfig;
}

export class StoreCreatePost extends BaseStore implements Store {
	private _state: ViewCreatePostConfig;
	protected _registeredViews: ViewCreatePost[] = [];
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerCreatePost();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerCreatePost(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewCreatePost): void {
		this._addView(view);
	}

	removeView(view: ViewCreatePost): void {
		this._removeView(view);
	}
}

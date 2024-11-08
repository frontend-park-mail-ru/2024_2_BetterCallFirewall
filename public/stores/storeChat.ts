import { Action } from '../actions/action';
import { reducerChat } from '../reducers/reducerChat';
import { ViewChat, ViewChatConfig } from '../views/chat/viewChat';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeChat extends ChangeHome {
	data: ViewChatConfig;
}

export class StoreChat extends BaseStore implements Store {
	private _state: ViewChatConfig;
	protected _registeredViews: ViewChat[] = [];
	private _storeHome: StoreHome;

	constructor(storeHome: StoreHome) {
		super();
		this._state = reducerChat();
		this._storeHome = storeHome;
	}

	handleAction(action: Action): void {
		this._state = { ...this._state, ...this._storeHome.state };
		this._state = reducerChat(this._state, action);
		this._registeredViews.forEach((view) => {
			if (view.active) {
				view.handleChange({ type: action.type, data: this._state });
			}
		});
	}

	addView(view: ViewChat): void {
		this._addView(view);
	}

	removeView(view: ViewChat): void {
		this._removeView(view);
	}
}

import { Action } from '../actions/action';
import { reducerMessages } from '../reducers/reducerMessages';
import { ViewMessages, ViewMessagesConfig } from '../views/messages/viewMessages';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeMessages extends ChangeHome {
	data: ViewMessagesConfig;
}

export class StoreMessages extends BaseStore implements Store {
    private _state: ViewMessagesConfig;
    protected _registeredViews: ViewMessages[] = [];
    private _storeHome: StoreHome;

    constructor(storeHome: StoreHome) {
        super();
        this._state = reducerMessages();
        this._storeHome = storeHome;
    }

    handleAction(action: Action): void {
        this._state = { ...this._state, ...this._storeHome.state };
        this._state = reducerMessages(this._state, action);
        console.log('storeMessages: state:', this._state);
        this._registeredViews.forEach((view) => {
            if (view.active) {
                view.handleChange({ type: action.type, data: this._state });
            }
        });
    }

    addView(view: ViewMessages): void {
        this._addView(view);
    }

    removeView(view: ViewMessages): void {
        this._removeView(view);
    }
}
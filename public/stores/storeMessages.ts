import { Action } from '../actions/action';
import { reducerHome } from '../reducers/reducerHome';
import { reducerMessages } from '../reducers/reducerMessages';
import { ViewMessages, ViewMessagesConfig } from '../views/messages/viewMessages';
import { BaseStore, Store } from './store';

export class StoreMessages extends BaseStore implements Store {
    private _state: ViewMessagesConfig;
    protected _registeredViews: ViewMessages[] = [];

    constructor() {
        super();
        this._state = reducerMessages();
    }

    handleAction(action: Action): void {
        this._state.home = reducerHome(this._state.home, action);
        this._state = reducerMessages(this._state, action);
        console.log('storeMessages: state:', this._state);
        this._registeredViews.forEach((view) => {
            if (view.active) {
                view.updateViewMessages(this._state);
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
import { Action } from '../actions/action';
import { reducerHome } from '../reducers/reducerHome';
import { reducerChat } from '../reducers/reducerChat';
import { ViewChat, ViewChatConfig } from '../views/chat/viewChat';
import { BaseStore, Store } from './store';

export class StoreChat extends BaseStore implements Store {
    private _state: ViewChatConfig;
    protected _registeredViews: ViewChat[] = [];

    constructor() {
        super();
        this._state = reducerChat();
    }

    handleAction(action: Action): void {
        this._state.home = reducerHome(this._state.home, action);
        this._state = reducerChat(this._state, action);
        console.log('storeChat: state:', this._state);
        this._registeredViews.forEach((view) => {
            if (view.active) {
                view.updateViewChat(this._state);
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
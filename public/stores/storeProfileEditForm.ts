import { Action } from '../actions/action';
import { reducerProfileEdit } from '../reducers/reducerProfileEdit';
import { ViewProfileEdit, ViewProfileEditConfig } from '../views/profileEdit/viewProfileEdit';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangeProfileEdit extends ChangeHome {
    data: ViewProfileEditConfig;
}

export class StoreProfileEdit extends BaseStore implements Store {
    protected _registeredViews: ViewProfileEdit[] = [];
    private _state: ViewProfileEditConfig;
    private _storeHome: StoreHome;

    constructor(storeHome: StoreHome) {
        super();
        this._state = reducerProfileEdit();
        this._storeHome = storeHome;
    }

    handleAction(action: Action): void {
        this._state = { ...this._state, ...this._storeHome.state };
        this._state = reducerProfileEdit(this._state, action);
        this._registeredViews.forEach((view) => {
            if (view.active) {
                view.handleChange({ type: action.type, data: this._state });
            }
        });
    }

    addView(view: ViewProfileEdit): void {
        this._addView(view);
    }

    removeView(view: ViewProfileEdit): void {
        this._removeView(view);
    }
}
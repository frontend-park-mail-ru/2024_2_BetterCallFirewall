import { Action } from '../actions/action';
import { reducerPostEdit } from '../reducers/reducerPostEdit';
import { ViewPostEdit, ViewPostEditConfig } from '../views/PostEdit/viewPostEdit';
import { BaseStore, Store } from './store';
import { ChangeHome, StoreHome } from './storeHome';

export interface ChangePostEdit extends ChangeHome {
    data: ViewPostEditConfig;
}

export class StorePostEdit extends BaseStore implements Store {
    protected _registeredViews: ViewPostEdit[] = [];
    private _state: ViewPostEditConfig;
    private _storeHome: StoreHome;

    constructor(storeHome: StoreHome) {
        super();
        this._state = reducerPostEdit();
        this._storeHome = storeHome;
    }

    handleAction(action: Action): void {
        this._state = { ...this._state, ...this._storeHome.state };
        this._state = reducerPostEdit(this._state, action);
        this._registeredViews.forEach((view) => {
            if (view.active) {
                view.handleChange({ type: action.type, data: this._state });
            }
        });
    }

    addView(view: ViewPostEdit): void {
        this._addView(view);
    }

    removeView(view: ViewPostEdit): void {
        this._removeView(view);
    }
}
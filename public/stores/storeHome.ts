import { Action, ActionType } from '../actions/action';
import { ACTION_HOME_TYPES } from '../actions/actionHome';
import { Store } from './store';
import dispatcher from '../dispatcher/dispatcher';
import { IHomeConfig } from '../app';
import { ViewHome } from '../views/home/viewHome';

export class StoreHome implements Store {
	private _view: ViewHome;
	private _viewConfig: IHomeConfig;

	constructor(view: ViewHome) {
		this._view = view;
		this._viewConfig = view.config;
	}

	handleAction(action: Action) {
		if (this._view.active) {
			switch (action.type) {
				case ACTION_HOME_TYPES.menuLinkClick:
					this._view.update(this._viewConfig);
					break;
				default:
					return;
			}
		}
	}

	subscribe(actionType: ActionType) {
		dispatcher.addListener(this, actionType);
	}
}

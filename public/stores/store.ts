import { Action, ActionType } from '../actions/action';
import dispatcher from '../dispatcher/dispatcher';
import { View } from '../views/view';

export interface Store {
	handleAction(action: Action): void;
	subscribe(actionType: ActionType): void;
	addView(view: View): void;
	removeView(view: View): void;
}

export abstract class BasicStore implements Store {
	protected _registeredViews: View[] = [];

	subscribe(actionType: ActionType): void {
		dispatcher.addListener(this, actionType);
	}

	protected _addView(view: View): void {
		this._registeredViews.push(view);
	}

	protected _removeView(view: View): void {
		this._registeredViews = this._registeredViews.filter(
			(value) => value != view,
		);
	}

	abstract handleAction(action: Action): void;
	abstract addView(view: View): void;
	abstract removeView(view: View): void;
}

import { Action } from '../actions/action';
import { Root } from '../components';
import dispatcher from '../dispatcher/dispatcher';

export type ViewData = object;

export interface View {
	sendAction(action: Action): void;
	update(data: ViewData): void;
}

export abstract class BaseView implements View {
	protected _root: Root;

	constructor(root: Root) {
		this._root = root;
	}

	sendAction(action: Action): void {
		dispatcher.getAction(action);
	}

	abstract update(data: ViewData): void;
	abstract clear(): void;
	abstract render(): void;
}

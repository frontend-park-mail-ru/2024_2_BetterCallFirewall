import { Action } from '../actions/action';
import { Root } from '../components';
import { IBaseComponent } from '../components/BaseComponent';
import dispatcher from '../dispatcher/dispatcher';

export type ViewData = object;
export type Components = Record<string, IBaseComponent>;

export interface View {
	sendAction(action: Action): void;
	update(data: ViewData): void;
}

export abstract class BaseView implements View {
	protected _root: Root;
	private _isActive: boolean;

	constructor(root: Root) {
		this._root = root;
		this._isActive = false;
	}

	get active() {
		return this._isActive;
	}

	set active(value: boolean) {
		this._isActive = value;
	}

	sendAction(action: Action): void {
		dispatcher.getAction(action);
	}

	abstract update(data: ViewData): void;
	abstract clear(): void;
	abstract render(): void;
}

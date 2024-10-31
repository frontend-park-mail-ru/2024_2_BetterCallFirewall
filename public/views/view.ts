import { Action } from '../actions/action';
import { Root } from '../components';
import { IBaseComponent } from '../components/BaseComponent';
import dispatcher from '../dispatcher/dispatcher';
import { Change, Store } from '../stores/store';

export type ViewData = object;
export type Components = Record<string, IBaseComponent>;

export interface View {
	sendAction(action: Action): void;
	clear(): void;
	handleChange(change: Change): void;
	render(): void;
	register(store: Store): void;
	unregister(store: Store): void;
	unregisterAllStores(): void;
}

export abstract class BaseView implements View {
	protected _root: Root;
	protected _registeredStores: Store[] = [];
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

	register(store: Store) {
		store.addView(this);
		this._registeredStores.push(store);
	}

	clear() {
		Object.entries(this._root.children).forEach(([, child]) => {
			child.remove();
		});
	}

	unregister(store: Store) {
		store.removeView(this);
		this._registeredStores = this._registeredStores.filter(
			(value) => value != store,
		);
	}

	unregisterAllStores() {
		this._registeredStores.forEach((store) => this.unregister(store));
	}

	abstract render(): void;
	abstract handleChange(change: Change): void;
}

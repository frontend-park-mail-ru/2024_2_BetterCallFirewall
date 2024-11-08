// import App from '../app';
// import { IBaseComponent } from '../components/BaseComponent';

// export type Components = Record<string, IBaseComponent>;

// export interface IBasePage {
// 	components: Components;
// 	render(pageLink?: string): void;
// 	clear(): void;
// }

// export default abstract class BasePage implements IBasePage {
// 	private _app: App;
// 	protected _components: Components = {};

// 	/**
// 	 *
// 	 * @param {App} app
// 	 */
// 	constructor(app: App) {
// 		this._app = app;
// 	}

// 	/**
// 	 * @returns {App}
// 	 */
// 	get app(): App {
// 		return this._app;
// 	}

// 	/**
// 	 * @returns {Object}
// 	 */
// 	get components(): Components {
// 		return this._components;
// 	}

// 	abstract render(pageLink?: string): void;
// 	abstract clear(): void;
// }

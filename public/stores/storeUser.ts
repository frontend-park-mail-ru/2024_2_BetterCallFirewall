// import { Action } from "../actions/action";
// import { BaseStore, Store } from "./store";

// export interface IUserConfig {
//     isAuth: boolean;
//     email: string;
//     user_link: string;
//     firstName: string;
//     lastName: string;
//     avatar_url: string;
//     description: string;
//     lastActive: string;
// }

// export class StoreUser extends BaseStore implements Store {
//     private _state: IUserConfig[] = [];
//     protected _registeredViews = [];

//     constructor() {
//         super();
//     }

//     handleAction(action: Action): void {
//         this._registeredViews.forEach((view) => {
//             this._state = reducerUser(this._state, action);
//             view.updateUser(this._state);
//         });
//     }

//     addView(view): void {
//         this._addView(view);
//     }

//     removeView(view): void {
//         this._removeView(view);
//     }
// }

// import { Action } from "../actions/action";
// import { IPostConfig } from "../components";
// import { reducerPost } from "../reducers/reducerPost";
// import { BaseStore, Store } from "./store";

// // interface PostView {
// // 	updatePosts(posts: IPostConfig[]): void;
// // 	active: boolean;
// // }

// export class StorePosts extends BaseStore implements Store {
//     private _state: IPostConfig[] = [];
//     protected _registeredViews = [];

//     constructor() {
// 		super();
// 	}

//     handleAction(action: Action): void {
//         this._registeredViews.forEach((view) => {
//             this._state = reducerPost(this._state, action);
//             view.updatePost(this._state);
//         });
// 	}

//     addView(view): void {
// 		this._addView(view);
// 	}

//     removeView(view): void {
// 		this._removeView(view);
// 	}
// }
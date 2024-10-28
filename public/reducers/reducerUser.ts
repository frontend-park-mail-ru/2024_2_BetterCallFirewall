import { Action } from '../actions/action';
import { UserState } from '../stores/storeUser';

const initialState: UserState = {
	profileHref: '',
};

export const reducerUser = (state?: UserState, action?: Action) => {
	if (!state) {
		return initialState;
	}
	if (!action) {
		return state;
	}
	switch (action.type) {
		default:
			return state;
	}
};

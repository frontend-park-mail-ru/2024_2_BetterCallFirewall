import { Action } from '../actions/action';
import { ACTION_PROFILE_TYPES } from '../actions/actionProfile';
import { IProfileConfig } from '../components/Profile/Profile';

const initialState: IProfileConfig = {
    key: 'profile',
    firstName: '',
    secondName: '',
    description: '',
    friendsCount: 0,
    groupsCount: 0,
    img: '',
};

export const reducerProfile = (state: IProfileConfig = initialState, action?: Action) => {
    switch (action?.type) {
        case ACTION_PROFILE_TYPES.updateProfile:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

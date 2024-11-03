import { Action } from '../actions/action';
import { ACTION_PROFILE_EDIT_TYPES, ActionUpdateProfileEditData } from '../actions/actionProfileEdit';
import { IProfileEditFormConfig } from '../components/ProfileEditForm/ProfileEditForm';
import config from '../config';
import deepClone from '../modules/deepClone';
import { ViewProfileEditConfig } from '../views/profileEdit/viewProfileEdit';

const initialProfileEditState: IProfileEditFormConfig = deepClone(
    config.profileEditConfig.profileEditForm
);

const initialState: ViewProfileEditConfig = {
    ...config.homeConfig,
    profileEditForm: initialProfileEditState,
};

export const reducerProfileEdit = (
    state: ViewProfileEditConfig = initialState,
    action?: Action,
) => {
    const newState = deepClone(state);
    
    switch (action?.type) {
        case ACTION_PROFILE_EDIT_TYPES.updateProfileEdit:
            return { 
                ...newState, 
                profileEditForm: {
                    ...newState.profileEditForm,
                    ...(action.data as ActionUpdateProfileEditData)
                }
            };
        default:
            return state;
    }
};
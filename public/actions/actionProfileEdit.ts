import { IProfileEditFormConfig } from '../components/ProfileEditForm/ProfileEditForm';
import { Action, ActionType } from './action';

export const ACTION_PROFILE_EDIT_TYPES = {
    updateProfileEdit: 'actionUpdateProfileEdit',
};

export interface ActionUpdateProfileEditData extends IProfileEditFormConfig {}


export class ActionUpdateProfileEdit implements Action {
    type: ActionType;
    data: ActionUpdateProfileEditData;

    constructor(data: ActionUpdateProfileEditData) {
        this.type = ACTION_PROFILE_EDIT_TYPES.updateProfileEdit;
        this.data = data;
    }
}

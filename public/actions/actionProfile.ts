import { Action, ActionType } from './action';

export const ACTION_PROFILE_TYPES = {
    updateProfile: 'updateProfile',
};

export interface ActionUpdateProfileData {
    firstName?: string;
    secondName?: string;
    description?: string;
    friendsCount?: number;
    groupsCount?: number;
    img?: string;
}

export class ActionUpdateProfile implements Action {
    type: ActionType;
    data: ActionUpdateProfileData;
    constructor(type: ActionType, data: ActionUpdateProfileData) {
        this.type = type;
        this.data = data;
    }
}

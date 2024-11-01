import { IMessagesConfig } from '../components/Message/Message';
import { Action, ActionType } from './action';

export const ACTION_MESSAGES_TYPES = {
    goToMessages: 'goToMessages',
    updateMessages: 'updateMessages',
};

export interface ActionUpdateMessagesData extends IMessagesConfig {}

export class ActionUpdateMessages implements Action {
    type: ActionType;
    data: ActionUpdateMessagesData;
    constructor(data: ActionUpdateMessagesData) {
        this.type = ACTION_MESSAGES_TYPES.updateMessages;
        this.data = data;
    }
}

export type ActionGoToMessagesData = {
    href: string;
};

export class ActionGoToMessages implements Action {
    type: ActionType;
    data: object;

    constructor(data: ActionGoToMessagesData) {
        this.type = ACTION_MESSAGES_TYPES.goToMessages;
        this.data = data;
    }
}
import { ActionUpdateProfileEdit } from '../../actions/actionProfileEdit';
import { Root } from '../../components';
import { ProfileEditForm, IProfileEditFormConfig } from '../../components/ProfileEditForm/ProfileEditForm';
import dispatcher from '../../dispatcher/dispatcher';
import { ChangeProfileEdit } from '../../stores/storeProfileEditForm';
import { ComponentsHome, HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export type ComponentsProfileEdit = {
    profileEditForm?: ProfileEditForm;
} & ComponentsHome;

export interface ViewProfileEditConfig extends HomeConfig {
    profileEditForm: IProfileEditFormConfig;
}

export interface IViewProfileEdit extends IViewHome {
    handleChange(change: ChangeProfileEdit): void;
}

export class ViewProfileEdit extends ViewHome implements IViewProfileEdit {
    protected _configProfileEdit: ViewProfileEditConfig;
    protected _components: ComponentsProfileEdit = {};

    constructor(config: ViewProfileEditConfig, root: Root) {
        super(config, root);
        this._configProfileEdit = config;
    }

    handleChange(change: ChangeProfileEdit): void {
        super.handleChange(change);
        switch (change.type) {
            default:
                this.updateViewProfileEdit(change.data);
        }
    }

    render(): void {
        this._render();
        dispatcher.getAction(
            new ActionUpdateProfileEdit(this._configProfileEdit.profileEditForm),
        );
    }

    updateViewProfileEdit(data: ViewProfileEditConfig): void {
        this._configProfileEdit = data;
        this._render();
    }

    protected _render(): void {
        super._render();
        this._renderProfileEditForm();
    }

    protected _renderProfileEditForm(): void {
        const content = this._components.content;
        if (!content) {
            throw new Error('content does no exist on ViewProfileEdit');
        }
        const profileEditForm = new ProfileEditForm(this._configProfileEdit.profileEditForm, content);
        profileEditForm.render();
        this._components.profileEditForm = profileEditForm;
    }
}
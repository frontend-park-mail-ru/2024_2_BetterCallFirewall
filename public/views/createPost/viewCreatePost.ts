import { ActionUpdateCreatePost } from '../../actions/actionCreatePost';
import { Root } from '../../components';
import { CreatePostForm, ICreatePostFormConfig } from '../../components/CreatePostForm/CreatePostForm';
import dispatcher from '../../dispatcher/dispatcher';
import { ChangeCreatePost } from '../../stores/storeCreatePost';
import { ComponentsHome, HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export type ComponentsCreatePost = {
    createPostForm?: CreatePostForm;
} & ComponentsHome;

export interface ViewCreatePostConfig extends HomeConfig {
    createPostForm: ICreatePostFormConfig;
}

export interface IViewCreatePost extends IViewHome {
    handleChange(change: ChangeCreatePost): void;
}

export class ViewCreatePost extends ViewHome implements IViewCreatePost {
    protected _configCreatePost: ViewCreatePostConfig;
    protected _components: ComponentsCreatePost = {};

    constructor(config: ViewCreatePostConfig, root: Root) {
        super(config, root);
        this._configCreatePost = config;
    }

    handleChange(change: ChangeCreatePost): void {
        super.handleChange(change);
        // this.updateViewCreatePost(change.data);
    }

    render(): void {
        this._render();
        dispatcher.getAction(
            new ActionUpdateCreatePost(this._configCreatePost.createPostForm),
        );
    }

    updateViewCreatePost(data: ViewCreatePostConfig): void {
        this._configCreatePost = data;
        this._render();
    }

    protected _render(): void {
        super._render();
        this._renderCreatePostForm();
    }

    protected _renderCreatePostForm(): void {
        const content = this._components.content;
        if (!content) {
            throw new Error('content does no exist on ViewCreatePost');
        }
        const createPostForm = new CreatePostForm(this._configCreatePost.createPostForm, content);
        createPostForm.render();
        this._components.createPostForm = createPostForm;
    }
}
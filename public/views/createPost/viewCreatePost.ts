import { ActionUpdateCreatePost } from '../../actions/actionCreatePost';
import api from '../../api/api';
import { Root } from '../../components';
import {
	CreatePostForm,
	ICreatePostFormConfig,
} from '../../components/CreatePostForm/CreatePostForm';
import dispatcher from '../../dispatcher/dispatcher';
import { ChangeCreatePost } from '../../stores/storeCreatePost';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

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
		this._addHandlers();
	}

	protected _renderCreatePostForm(): void {
		const content = this.content;
		const createPostForm = new CreatePostForm(
			this._configCreatePost.createPostForm,
			content,
		);
		createPostForm.render();
		this._components.createPostForm = createPostForm;
	}

	private get _createPostForm(): CreatePostForm {
		const form = this._components.createPostForm;
		if (!form) {
			throw new Error('form not found');
		}
		return form;
	}

	private _addHandlers() {
		this.content.addHandler(
			this._createPostForm.htmlElement,
			'submit',
			(event) => {
				event.preventDefault();
				const formData = this._createPostForm.formData;
				console.log('formData:', formData);
				console.log(formData.get('text'));
				console.log(formData.get('file'));
				api.createPost(formData);
			},
		);
	}
}

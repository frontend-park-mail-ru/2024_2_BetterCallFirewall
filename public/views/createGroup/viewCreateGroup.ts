import { Root } from '../../components';
import {
	CreateGroupForm,
	ICreateGroupFormConfig,
} from '../../components/CreateGroupForm/CreateGroupForm';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsCreateGroup = {
	createGroupForm?: CreateGroupForm;
} & ComponentsHome;

export interface ViewCreateGroupConfig extends HomeConfig {
	createGroupForm: ICreateGroupFormConfig;
}

export class ViewCreateGroup extends ViewHome {
	protected _configCreateGroup: ViewCreateGroupConfig;
	protected _components: ComponentsCreateGroup = {};

	constructor(config: ViewCreateGroupConfig, root: Root) {
		super(config, root);
		this._configCreateGroup = config;
	}

	get config(): ViewCreateGroupConfig {
		return this._configCreateGroup;
	}

	private get _createGroupForm(): CreateGroupForm {
		const form = this._components.createGroupForm;
		if (!form) {
			throw new Error('form not found');
		}
		return form;
	}

	// handleChange(change: ChangeCreateGroup): void {
	// 	super.handleChange(change);
	// }

	render(): void {
		this._render();
		// dispatcher.getAction(
		// 	new ActionUpdateCreatePost(this._configCreatePost.createPostForm),
		// );
	}

	updateViewCreatePost(data: ViewCreateGroupConfig): void {
		this.updateViewHome(data);
		this._configCreateGroup = Object.assign(this._configCreateGroup, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderCreatePostGroup();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderCreatePostGroup(): void {
		this._components.createGroupForm = new CreateGroupForm(
			this._configCreateGroup.createGroupForm,
			this.content,
		);
	}

	protected _addHandlers() {
		super._addHandlers();
		this._createGroupForm.vnode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._createGroupForm.formData,
					this._createGroupForm.form,
				);
				if (formData) {
					if (
						formData.get('text') ||
						(formData.get('file') as File).name
					) {
						// api.createGroup(formData);
						this._createGroupForm.clearError();
					} else {
						this._createGroupForm.printError(
							'Группа не должна быть пустой',
						);
					}
				}
			},
		});
		this._addHandlerInput();
	}

	private _addHandlerInput(): void {
		this._createGroupForm.fileInputVNode.handlers.push(
			{
				event: 'click',
				callback: (event) => {
					const label = this._createGroupForm.label;
					const preview = this._createGroupForm
						.img as HTMLImageElement;
					const input = event.target as HTMLInputElement;
					if (input.value) {
						input.value = '';
						event.preventDefault();
						label?.classList.remove('active');
						label.textContent = 'Прикрепить картинку';
						preview.src = '';
					}
				},
			},
			{
				event: 'change',
				callback: (event) => {
					const label = this._createGroupForm.label;
					const preview = this._createGroupForm
						.img as HTMLImageElement;
					const input = event.target as HTMLInputElement;
					if (input.files && input.files.length > 0) {
						if (label) {
							label.classList.add('active');
							label.textContent =
								'Картинка выбрана, нажмите, чтобы отменить';
						}
						const reader = new FileReader();
						reader.onload = function (e) {
							preview.src = e.target?.result as string;
						};
						reader.readAsDataURL(input.files[0]);
					}
				},
			},
		);
	}
}

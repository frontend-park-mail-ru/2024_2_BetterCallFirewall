import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ACTION_CREATE_GROUP_TYPES } from '../../actions/actionCreateGroup';
import api from '../../api/api';
import { Root } from '../../components';
import {
	CreateGroupForm,
	ICreateGroupFormConfig,
} from '../../components/CreateGroupForm/CreateGroupForm';
import { PAGE_URLS } from '../../config';
import { GroupPayload } from '../../models/group';
import fileToString from '../../modules/fileToString';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeCreateGroup } from '../../stores/storeCreateGroup';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsCreateGroup = {
	createGroupForm?: CreateGroupForm;
} & ComponentsHome;

export interface ViewCreateGroupConfig extends HomeConfig {
	createGroupForm: ICreateGroupFormConfig;
	createdGroupId?: number;
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

	handleChange(change: ChangeCreateGroup): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
			case ACTION_CREATE_GROUP_TYPES.goToCreateGroup:
				this._configCreateGroup = Object.assign(
					this._configCreateGroup,
					change.data,
				);
				this.render();
				break;
			default:
				this.updateViewCreatePost(change.data);
		}
	}

	render(): void {
		this._render();
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

		if (this._configCreateGroup.createdGroupId) {
			this.sendAction(
				new ActionAppGoTo(
					PAGE_URLS.groupPage +
						`/${this._configCreateGroup.createdGroupId}`,
				),
			);
		}
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
			callback: async (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._createGroupForm.formData,
					this._createGroupForm.form,
				);
				if (formData) {
					if (formData.get('name')) {
						const fileStr = await fileToString(
							formData.get('file') as File,
						);
						if (fileStr === null) {
							this._createGroupForm.printError(
								'Что-то пошло не так',
							);
							return;
						}
						const groupPayload: GroupPayload = {
							name: formData.get('name') as string,
							about: formData.get('description') as string,
							avatar: fileStr,
						};
						api.createGroup(groupPayload);
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

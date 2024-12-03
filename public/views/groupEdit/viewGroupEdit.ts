import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ActionGroupPageRequest } from '../../actions/actionGroupPage';
import { ACTION_GROUPS_TYPES } from '../../actions/actionGroups';
import api from '../../api/api';
import { Root } from '../../components';
import {
	GroupEditForm,
	IGroupEditFormConfig,
} from '../../components/GroupEditForm/GroupEditForm';
import { PAGE_LINKS, PAGE_URLS } from '../../config';
import { GroupPayload } from '../../models/group';
import fileToString from '../../modules/fileToString';
import { throttle } from '../../modules/throttle';
import Validator from '../../modules/validation';
import { update } from '../../modules/vdom';
import { ChangeGroupEdit } from '../../stores/storeGroupEdit';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsGroupEdit = {
	groupEditForm?: GroupEditForm;
} & ComponentsHome;

export interface ViewGroupEditConfig extends HomeConfig {
	groupEditForm: IGroupEditFormConfig;
	groupId: number;
}

export class ViewGroupEdit extends ViewHome {
	protected _configGroupEdit: ViewGroupEditConfig;
	protected _components: ComponentsGroupEdit = {};

	constructor(config: ViewGroupEditConfig, root: Root) {
		super(config, root);
		this._configGroupEdit = config;
	}

	get config(): ViewGroupEditConfig {
		return this._configGroupEdit;
	}

	handleChange(change: ChangeGroupEdit): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
				this._configGroupEdit = Object.assign(
					this._configGroupEdit,
					change.data,
				);
				this.render();
				break;
			case ACTION_GROUPS_TYPES.editSuccess:
				this.sendAction(
					new ActionAppGoTo(
						PAGE_LINKS.groupPage +
							`/${this._configGroupEdit.groupId}`,
					),
				);
				break;
			default:
				this.updateViewGroupEdit(change.data);
		}
	}

	render(): void {
		this._render();
		this._groupPageRequest();
	}

	updateViewGroupEdit(data: ViewGroupEditConfig): void {
		this.updateViewHome(data);
		this._configGroupEdit = Object.assign(this._configGroupEdit, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderGroupEditForm();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderGroupEditForm(): void {
		this._components.groupEditForm = new GroupEditForm(
			this._configGroupEdit.groupEditForm,
			this.content,
		);
	}

	protected _addHandlers() {
		super._addHandlers();
		this._addFormHandlers();
	}

	protected _addFormHandlers() {
		this._groupEditForm.vnode.handlers.push({
			event: 'submit',
			callback: async (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this._groupEditForm.formData,
					this._groupEditForm.form,
				);
				if (!formData) {
					return;
				}
				if (!formData.get('name')) {
					this._groupEditForm.printError(
						'Группа не должна быть пустой',
					);
					return;
				}
				const fileStr = await fileToString(
					formData.get('file') as File,
				);
				if (fileStr === null) {
					this._groupEditForm.printError('Что-то пошло не так');
					return;
				}
				const groupPayload: GroupPayload = {
					name: formData.get('name') as string,
					about: formData.get('description') as string,
					avatar: fileStr,
				};
				api.groupEdit(groupPayload, this._configGroupEdit.groupId);
				this._groupEditForm.clearError();
			},
		});
		this._addInputHandler();
	}

	private _addInputHandler(): void {
		this._groupEditForm.fileInputVNode.handlers.push(
			{
				event: 'click',
				callback: (event) => {
					const label = this._groupEditForm.label;
					const preview = this._groupEditForm.img as HTMLImageElement;
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
					const label = this._groupEditForm.label;
					const preview = this._groupEditForm.img as HTMLImageElement;
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

	private get _groupEditForm(): GroupEditForm {
		const form = this._components.groupEditForm;
		if (!form) {
			throw new Error('groupEditForm not exist');
		}
		return form;
	}

	private _groupPageRequest = throttle(() => {
		this.sendAction(
			new ActionGroupPageRequest(
				PAGE_URLS.groupPage + `/${this._configGroupEdit.groupId}`,
			),
		);
	}, 1000);
}

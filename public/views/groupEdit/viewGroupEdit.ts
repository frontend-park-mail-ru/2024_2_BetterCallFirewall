import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ACTION_GROUPS_TYPES } from '../../actions/actionGroups';
import api from '../../api/api';
import { Root } from '../../components';
import {
	GroupEditForm,
	IGroupEditFormConfig,
} from '../../components/GroupEditForm/GroupEditForm';
import { PAGE_LINKS } from '../../config';
import { GroupPayload } from '../../models/group';
import fileToString from '../../modules/fileToString';
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
	}

	private get _groupEditForm(): GroupEditForm {
		const form = this._components.groupEditForm;
		if (!form) {
			throw new Error('groupEditForm not exist');
		}
		return form;
	}
}

import { Root } from '../../components';
import {
	GroupEditForm,
	IGroupEditFormConfig,
} from '../../components/GroupEditForm/GroupEditForm';
import { update } from '../../modules/vdom';
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

	// handleChange(change: ChangeGroupEdit): void {}

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
    }
}

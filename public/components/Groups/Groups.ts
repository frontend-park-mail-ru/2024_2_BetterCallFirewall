import { VNode } from '../../modules/vdom';
import { Component, ComponentConfig } from '../Component';
import { Group, GroupConfig } from '../Group/Group';

export interface GroupsConfig extends ComponentConfig {
	headerText: string;
	groupsConfig: GroupConfig[];
}

export class Groups extends Component {
	protected _config: GroupsConfig;
	private _groups: Group[] = [];

	constructor(config: GroupsConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Groups.hbs');
	}

	get listGroups(): Group[] {
		return this._groups;
	}

	protected _prerender(): void {
		super._prerender();
		this._groups = this._config.groupsConfig.map((config) => {
			return new Group(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			groups: this._groups.map((group) => {
				return group.render();
			}),
		};
	}
	get createGroupButtonVNode(): VNode {
		return this._findVNodeByKey('createGroup');
	}
}

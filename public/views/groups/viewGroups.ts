import { ActionAppGoTo } from '../../actions/actionApp';
import { Root } from '../../components';
import { Groups, GroupsConfig } from '../../components/Groups/Groups';
import { update } from '../../modules/vdom';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsGroups = {
	groups?: Groups;
} & ComponentsHome;

export interface ViewGroupsConfig extends HomeConfig {
	groups: GroupsConfig;
}

export class ViewGroups extends ViewHome {
	protected _configGroups: ViewGroupsConfig;
	protected _components: ComponentsGroups = {};

	constructor(config: ViewGroupsConfig, root: Root) {
		super(config, root);
		this._configGroups = config;
	}

	get config(): ViewGroupsConfig {
		return this._configGroups;
	}

    protected get groups(): Groups {
		const groups = this._components.groups;
		if (!groups) {
			throw new Error('groups does not exist');
		}
		return groups;
	}

    protected _addHandlers() {
		super._addHandlers();
        this._addGroupsHandlers(this.groups);
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderGroups();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	private _renderGroups(): void {
		const exampleGroups: GroupsConfig = {
			key: 'groups',
			headerText: 'Группы',
			groupsConfig: [
                {
                    id: 2,
                    key: 'group',
					name: 'Рифмы и панчи',
					avatar: './img.jpg',
                    isFollow: true
				},
				{
                    id: 1,
                    key: 'group',
					name: 'Мысли джокера',
					avatar: './img.jpg',
                    isFollow: true
				},
			],
		};
		this._components.groups = new Groups(
			// this._configGroups.groups,
            exampleGroups,
			this.content,
		);
	}

	updateViewGroups(data: ViewGroupsConfig) {
		this._configGroups = data;
		this._render();
	}

	render(): void {
		this._render();
	}

    private _addGroupsHandlers(groups: Groups) {
        groups.listGroups.forEach((group) => {
            const groupConfig = group.config;
            if (groupConfig.isFollow) {
                group.unfollowGroupButtonVNode.handlers.push({
                    event: 'click',
                    callback: (event) => {
                        event.preventDefault();
                        // api.unfollowGroup(groupConfig.id);
                    }
                });
            } else {
                group.followGroupButtonVNode.handlers.push({
                    event: 'click',
                    callback: (event) => {
                        event.preventDefault();
                        // api.followGroup(groupConfig.id);
                    }
                });
            }
            group.groupLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(`groups/${group.config.id}`));
				},
			});
			group.groupLinkAvatarVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(`groups/${group.config.id}`));
				},
			});
        });
        
    }
}

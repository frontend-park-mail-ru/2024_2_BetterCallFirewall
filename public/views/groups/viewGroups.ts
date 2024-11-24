import { ActionAppGoTo } from '../../actions/actionApp';
import { ACTION_GROUPS_TYPES, ActionGroupsGetGroups } from '../../actions/actionGroups';
import api from '../../api/api';
import { Root } from '../../components';
import { Groups, GroupsConfig } from '../../components/Groups/Groups';
import { PAGE_LINKS } from '../../config';
import { update } from '../../modules/vdom';
import { ChangeGroups } from '../../stores/storeGroups';
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

	handleChange(change: ChangeGroups): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_GROUPS_TYPES.getGroups:
				this.updateViewGroups(change.data);
				api.requestGroups();
				break;
			default:
				this.updateViewGroups(change.data);
		}
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
		this._components.groups = new Groups(
			this._configGroups.groups,
			this.content,
		);
	}

	updateViewGroups(data: ViewGroupsConfig) {
		this._configGroups = Object.assign(this._configGroups, data);
		this._render();
	}

	render(): void {
		this._render();
		// this.sendAction(new ActionFriendsGetFriends());
		this.sendAction(new ActionGroupsGetGroups());
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
					},
				});
			}
			// if (!groupConfig.isFollow) {
			// 	group.followGroupButtonVNode.handlers.push({
			// 		event: 'click',
			// 		callback: (event) => {
			// 			event.preventDefault();
			// 			// api.followGroup(groupConfig.id);
			// 		},
			// 	});
			// }
			group.groupLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(`/groups/${group.config.id}`),
					);
				},
			});
			group.groupLinkAvatarVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(`/groups/${group.config.id}`),
					);
				},
			});
		});
		this.groups.createGroupButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(new ActionAppGoTo(PAGE_LINKS.createGroup));
			},
		});
	}
}

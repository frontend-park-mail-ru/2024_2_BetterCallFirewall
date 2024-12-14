import { ActionAppGoTo } from '../../actions/actionApp';
import {
	ACTION_GROUPS_TYPES,
	ActionGroupsFollowGroup,
	ActionGroupsGetGroups,
	ActionGroupsUnfollowGroup,
} from '../../actions/actionGroups';
import { Root } from '../../components';
import { Groups, GroupsConfig } from '../../components/Groups/Groups';
import { PAGE_LINKS, PAGE_URLS, THROTTLE_LIMITS } from '../../config';
import { throttle } from '../../modules/throttle';
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
			case ACTION_GROUPS_TYPES.groupsFollowGroupSuccess:
			case ACTION_GROUPS_TYPES.groupsUnfollowGroupSuccess:
				this.sendAction(new ActionGroupsGetGroups());
				break;
			case ACTION_GROUPS_TYPES.getGroupsSuccess:
				if (this._isNearBottom()) {
					const lastId =
						this._configGroups.groups.groupsConfig.at(-1)?.id;
					if (lastId) {
						this.sendAction(new ActionGroupsGetGroups(lastId));
					}
				}
				this.updateViewGroups(change.data);
				break;
			default:
				this.updateViewGroups(change.data);
		}
	}

	protected _addHandlers() {
		super._addHandlers();
		this._addScrollHandler();
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
		super.updateViewHome(data);
		this._configGroups = Object.assign(this._configGroups, data);
		this._render();
	}

	render(): void {
		this._render();
		this.sendAction(new ActionGroupsGetGroups());
	}

	private _addScrollHandler() {
		this._root.addDocumentHandler({
			event: 'scroll',
			callback: (event) => {
				event.preventDefault();
				if (this._isNearBottom()) {
					this._scrollHandler();
				}
			},
		});
	}

	private _addGroupsHandlers(groups: Groups) {
		groups.listGroups.forEach((group) => {
			const groupConfig = group.config;
			if (groupConfig.isFollow) {
				group.unfollowGroupButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						this.sendAction(
							new ActionGroupsUnfollowGroup(group.id),
						);
					},
				});
			}
			if (!groupConfig.isFollow) {
				group.followGroupButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						this.sendAction(new ActionGroupsFollowGroup(group.id));
					},
				});
			}
			group.groupLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(
							PAGE_URLS.groups + `/${group.config.id}`,
						),
					);
				},
			});
			group.groupLinkAvatarVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(
							PAGE_URLS.groups + `/${group.config.id}`,
						),
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

	private _scrollHandler = throttle(() => {
		const groups = this._configGroups.groups.groupsConfig;
		this.sendAction(new ActionGroupsGetGroups(groups.at(-1)?.id));
	}, THROTTLE_LIMITS.batchLoading);
}

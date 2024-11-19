import Component, { ComponentConfig } from '../Component';
import { Friend, FriendConfig } from '../Friend/Friend';

export interface FriendsConfig extends ComponentConfig {
	headerText: string;
	friendsConfig: FriendConfig[];
}

export class Friends extends Component {
	protected _config: FriendsConfig;
	private _people: Friend[] = [];

	constructor(config: FriendsConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Friends.hbs');
	}

	get listPeople(): Friend[] {
		return this._people;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
			friends: this._config.friendsConfig.map((config) => {
				const friend = new Friend(config, this);
				return friend.render();
			}),
		};
	}
}

import { IHomeConfig } from '../../app';
import { Root } from '../../components';
import { Friend } from '../../components/Friend/Friend';
import { ViewHome } from '../home/viewHome';

// export interface FeedConfig extends IBaseComponentConfig {
// 	className: string;
// }

export class ViewFriends extends ViewHome {
	constructor(config: IHomeConfig, root: Root) {
		super(config, root);
	}

	protected _renderContent(): void {
		super._renderContent();
		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewProfile');
		}
		// Тестовые друзья
		for (let i = 0; i < 10; i++) {
			const friend = new Friend(
				{
					key: 'friend',
					avatar: '../../img/avatar.png',
					name: 'Asap Rocky',
					description: 'Canadian singer, songwriter and actor.',
					isFriend: true,
				},
				content,
			);
			content.addChild(friend);
			friend.render();
		}

		console.log('viewFriends: components:', this._components);
	}
}

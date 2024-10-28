import { IHomeConfig } from '../../app';
import { Post, Root } from '../../components';
import { ViewHome } from '../home/viewHome';

// export interface FeedConfig extends IBaseComponentConfig {
// 	className: string;
// }

export class ViewFeed extends ViewHome {
	constructor(config: IHomeConfig, root: Root) {
		super(config, root);
	}

	protected _renderContent(): void {
		super._renderContent();
		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewProfile');
		}
		// Тестовые посты
		let counter = 0;
		for (let i = 0; i < 10; i++) {
			const post = new Post(
				{
					key: (counter++).toString(),
					id: 1,
					title: 'Header',
					text: 'Text',
					date: '01.01.2024',
				},
				content,
			);
			content.addChild(post);
			post.render();
		}
	}
}

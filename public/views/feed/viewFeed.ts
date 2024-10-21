import { Content, Post, Root } from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import { HomeConfig, ViewHome } from '../home/viewHome';

// export interface FeedConfig extends IBaseComponentConfig {
// 	className: string;
// }

export class ViewFeed extends ViewHome {
	constructor(config: HomeConfig, root: Root) {
		super(config, root);
	}

    _updateContent() {
        
    }

	protected _renderContent(parent: IBaseComponent): void {
		const feedConfig = this._config.main.content;
		const feed = new Content(feedConfig, parent);
		feed.render();
		this._components.content = feed;

		// Тестовые посты
		let counter = 0;
		for (let i = 0; i < 10; i++) {
			const post = new Post(
				{
					key: (counter++).toString(),
					title: 'Header',
					text: 'Text',
					date: '01.01.2024',
				},
				this._components.content,
			);
			post.render();
		}
	}
}

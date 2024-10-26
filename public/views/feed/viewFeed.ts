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

	protected _updateContent(parent: IBaseComponent) {
		console.log('content');
		this._clearContent();
		this._renderContent(parent);
	}

	private _clearContent() {
		if (this._components.content) {
			const content = this._components.content;
			content.remove();
		}
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
			feed.addChild(post);
			post.render();
		}
	}
}

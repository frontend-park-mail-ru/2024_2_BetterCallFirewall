import { Root } from '../components';
import { Router, RouterConfig } from '../router/router';
import { QuestionConfig } from './components/Question/Question';
import config, { PAGE_LINKS } from './config';
import { ViewMetrics, ViewMetricsConfig } from './view/viewMetrics';
import { ViewQuestion, ViewQuestionConfig } from './view/viewQuestion';

export interface URLInterface {}

export interface AppConfig {
	URL: URLInterface;
	questionConfig: ViewQuestionConfig;
	metricsConfig: ViewMetricsConfig;
}

class App {
	private _router: Router;
	private _config: AppConfig;
	private _root: Root;
	constructor(config: AppConfig) {
		this._config = config;
		this._root = new Root();
		const questionView = new ViewQuestion(
			this._config.questionConfig,
			this._root,
		);
		const metricsView = new ViewMetrics(
			this._config.metricsConfig,
			this._root,
		);
		const routerConfig: RouterConfig = [
			{
				path: PAGE_LINKS.question,
				view: questionView,
			},
			{
				path: PAGE_LINKS.metrics,
				view: metricsView,
			},
		];
		this._router = new Router(questionView, routerConfig);
	}

	renderStart() {
		this._router.activeView?.render();
	}

	get router(): Router {
		return this._router;
	}
}

export default new App(config);

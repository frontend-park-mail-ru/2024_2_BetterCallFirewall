import { Root } from "../../components";
import { update } from "../../modules/vdom";
import { Change } from "../../stores/store";
import { Components, View } from "../../views/view";
import { Metrics, MetricsConfig } from "../components/Metrics/Metrics";

export type ComponentsMetrics = {
	metrics?: Metrics;
} & Components;

export interface ViewMetricsConfig {
	metrics: MetricsConfig;
}

export class ViewMetrics extends View {
	protected _components: ComponentsMetrics = {};
	private _configMetrics: ViewMetricsConfig;

	constructor(config: ViewMetricsConfig, root: Root) {
		super(root);
		this._configMetrics = config;
	}

	handleChange(change: Change): void {
		switch (change.type) {
            default:
                return;
		}
	}

	get config() {
		return this._configMetrics;
	}

	render(data?: ViewMetricsConfig): void {
		if (data) {
			this._configMetrics = Object.assign(this._configMetrics, data);
		}
		this._render();
	}

	protected _render() {
        const rootNode = this._root.node;
		this._root.clear();
		this._components.metrics = new Metrics(
			this._configMetrics.metrics,
			this._root,
		);

        const rootVNode = this._root.newVNode();
        this._addHandlers();
        update(rootNode, rootVNode);
	}

    protected _addHandlers() {}
}
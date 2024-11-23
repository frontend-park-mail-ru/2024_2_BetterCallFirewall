import Component, { ComponentConfig } from "../../../components/Component";


export interface ScoreConfig extends ComponentConfig {
    id: number;
    color: string;
}

export class Score extends Component {
    protected _config: ScoreConfig;

    constructor(config: ScoreConfig, parent: Component) {
        super(config, parent);
        this._config = config;
    }

    render(): string {
        this._prerender();
        return this._render('Score.hbs');
    }
}
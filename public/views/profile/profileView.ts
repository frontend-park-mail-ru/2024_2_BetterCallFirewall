import { Root } from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import { IProfileConfig, Profile } from '../../components/Profile/Profile';
import { HomeConfig, ViewHome } from '../home/viewHome';

export class ViewProfile extends ViewHome {
	constructor(config: HomeConfig, root: Root) {
		super(config, root);
	}

    updateProfile(data: IProfileConfig): void {
        const content = this._components.content;
		content?.update(data);
		this._addProfileHandlers();
    }

	protected _renderContent(parent: IBaseComponent): void {
		// const profileConfig = this._config.main.header.profile;
		const profile = new Profile({ key: 'profile' }, parent); // конфиг хардкод
		profile.render();
		this._components.content = profile;
	}

    _addProfileHandlers() {

    }
}

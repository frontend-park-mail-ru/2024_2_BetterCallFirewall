import { IHeaderConfig } from '../components';
import { IProfileConfig } from '../components/Profile/Profile';
import deepClone from '../modules/deepClone';

export interface HeaderResponse {
	author_id: number;
	author: string;
	avatar: string;
}

export const headerResponseToProfileConfig = (
	profileData: IProfileConfig,
	headerResponse: HeaderResponse,
): IProfileConfig => {
	return Object.assign({}, profileData, {
		id: headerResponse.author_id,
		img: headerResponse.avatar,
	});
};

export const headerResponseToHeaderConfig = (
	headerConfig: IHeaderConfig,
	headerResponse: HeaderResponse,
): IHeaderConfig => {
	const newHeaderConfig = deepClone(headerConfig);
	newHeaderConfig.profile.id = headerResponse.author_id;
	newHeaderConfig.profile.avatar = headerResponse.avatar;
	return newHeaderConfig;
};

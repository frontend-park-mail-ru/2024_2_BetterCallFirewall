import { HeaderConfig } from '../components';
import { IProfileConfig } from '../components/Profile/Profile';
import deepClone from '../modules/deepClone';
import parseImage from '../modules/parseImage';

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
	headerConfig: HeaderConfig,
	headerResponse: HeaderResponse,
): HeaderConfig => {
	const newHeaderConfig = deepClone(headerConfig);
	newHeaderConfig.profile.id = headerResponse.author_id;
	newHeaderConfig.profile.name = headerResponse.author;
	newHeaderConfig.profile.avatar = parseImage(headerResponse.avatar);
	return newHeaderConfig;
};

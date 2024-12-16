import { HeaderConfig } from '../components';
import { ProfileConfig } from '../components/Profile/Profile';
import deepClone from '../modules/deepClone';
import parseFile from '../modules/parseFile';

export interface HeaderResponse {
	author_id: number;
	author: string;
	avatar: string;
}

export const headerResponseToProfileConfig = (
	profileData: ProfileConfig,
	headerResponse: HeaderResponse,
): ProfileConfig => {
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
	newHeaderConfig.profile.avatar = parseFile(headerResponse.avatar);
	return newHeaderConfig;
};

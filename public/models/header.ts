import { IProfileConfig } from '../components/Profile/Profile';

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

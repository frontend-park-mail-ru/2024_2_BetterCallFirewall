import { PAGE_URLS } from '../config';

export const profileHref = (id: number) => {
	return `/${id}`;
};

export const groupPageHref = (id: number) => {
	return PAGE_URLS.groupPage + `/${id}`;
};

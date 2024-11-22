import { ROOT } from '../config';

const parseImage = (img: string): string => {
	if (!img) {
		return '';
	}
	if (img[0] !== '/') {
		img = '/' + img;
	}
	return ROOT + img;
};

export default parseImage;

import { FileType } from '../components/Attachment/Attachment';
import { FilePayload } from '../models/file';

const imageMimeTypes = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/x-icon',
];

const imageExtensions = ['jpeg', 'png', 'webp', 'gif', 'x-icon'];

export const fileType = (file: FilePayload): FileType => {
	if (!file.src || !file.mimeType) {
		return FileType.Empty;
	}
	if (imageMimeTypes.includes(file.mimeType)) {
		return FileType.Image;
	}
	return FileType.File;
};

export const fileTypeFromName = (file: string): FileType => {
	if (!file) {
		return FileType.Empty;
	}
	const image = imageExtensions.filter((ext) => {
		const regex = new RegExp(`.${ext}$`);
		if (file.match(regex)) {
			return ext;
		}
	});
	if (image.length) {
		return FileType.Image;
	}
	return FileType.File;
};

export const fileNameFromURL = (file: string): string => {
	const substr = '|';
	const start = file.indexOf(substr);
	if (start === -1) {
		return file;
	}
	return file.slice(start + substr.length);
};

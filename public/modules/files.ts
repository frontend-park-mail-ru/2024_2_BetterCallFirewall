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
	const stop = file.lastIndexOf('.');
	if (start === -1) {
		const substr = 'files/';
		const start = file.indexOf(substr);
		if (start === -1) {
			return file;
		}
		return file.slice(start + substr.length);
	}
	return file.slice(start + substr.length, stop);
};

export const shortenFileName = (fileName: string): string => {
	const limit = 40;
	if (fileName.length > limit) {
		const lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex !== -1) {
			const name = fileName.substring(0, lastDotIndex);
			const extension = fileName.substring(lastDotIndex);
			const shortenedName =
				name.substring(0, limit - 3) + '...' + extension;
			return shortenedName;
		}
		return fileName.substring(0, limit - 3) + '...';
	}
	return fileName;
};

import { FileType } from '../components/Attachment/Attachment';
import { FilePayload } from '../models/file';

const imageMimeTypes = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/x-icon',
];

const fileType = (file: FilePayload): FileType => {
	if (!file.src || !file.type) {
		return FileType.Empty;
	}
	if (file.type in imageMimeTypes) {
		return FileType.Image;
	}
	return FileType.File;
};

export default fileType;

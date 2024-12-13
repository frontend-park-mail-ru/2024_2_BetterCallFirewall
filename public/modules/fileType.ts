import { FileType } from '../components/Attachment/Attachment';
import { FilePayload } from '../models/file';

const imageMimeTypes = {
	jpeg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp',
	gif: 'image/gif',
	ico: 'image/x-icon',
};

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

import { fileNameFromURL, fileTypeFromName } from '../modules/files';

export interface FilePayload {
	src: string;
	name: string;
	mimeType: string;
}

export const filePayloadFromURL = (file: string): FilePayload => {
	return {
		src: file,
		name: fileNameFromURL(file),
		mimeType: fileTypeFromName(file),
	};
};

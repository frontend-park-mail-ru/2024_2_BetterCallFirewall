import { fileTypeFromName } from '../modules/files';

export interface FilePayload {
	src: string;
	mimeType: string;
}

export const filePayloadFromURL = (file: string): FilePayload => {
	return {
		src: file,
		mimeType: fileTypeFromName(file),
	};
};

import { StickerConfig } from '../components/Sticker/Sticker';

export interface StickerResponse {
	file: string;
}

export const toStickerConfig = (
	stickerResponse: StickerResponse,
): StickerConfig => {
	const stickerData: StickerConfig = {
		key: `sticker-${stickerResponse}`,
		file: stickerResponse.file,
	};

	return stickerData;
};

export interface StickerPayload {
	file: string;
}

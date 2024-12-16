import { StickerConfig } from '../components/Sticker/Sticker';

export type StickerResponse = string;

export const toStickerConfig = (
	stickerResponse: StickerResponse,
): StickerConfig => {
	const stickerData: StickerConfig = {
		key: `sticker-${stickerResponse}`,
		file: stickerResponse,
	};

	return stickerData;
};

export const stickerConfigFromURL = (sticker: string): StickerConfig => {
	return {
		key: `sticker-${sticker}`,
		file: sticker,
	};
};

export interface StickerPayload {
	file: string;
}

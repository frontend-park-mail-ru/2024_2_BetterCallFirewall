import { StickerConfig } from '../components/Sticker/Sticker';
import { uuid } from '../modules/uuid';

export type StickerResponse = string;

export const toStickerConfig = (
	stickerResponse: StickerResponse,
): StickerConfig => {
	const stickerData: StickerConfig = {
		key: `sticker-${uuid()}`,
		file: stickerResponse,
	};

	return stickerData;
};

export const stickerConfigFromURL = (sticker: string): StickerConfig => {
	return {
		key: `sticker-${uuid()}`,
		file: sticker,
	};
};

export interface StickerPayload {
	file: string;
}

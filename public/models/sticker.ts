import { StickerConfig } from "../components/Sticker/Sticker";

export interface StickerResponse {
	id: number;
	file: string;
}

export const toStickersConfig = (
    stickerResponse: StickerResponse,
): StickerConfig => {
    const stickerData: StickerConfig = {
        id: stickerResponse.id,
        key: `sticker-${stickerResponse.id}`,
        file: stickerResponse.file,
    };

    return stickerData;
};
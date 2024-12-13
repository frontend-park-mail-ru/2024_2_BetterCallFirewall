import { FileType } from '../components/Attachment/Attachment';
import { FilePayload } from '../models/file';

const fileType = (file: FilePayload): FileType => {
	if (file.src) {
		return FileType.Image;
	}
	return FileType.Image;
};

export default fileType;

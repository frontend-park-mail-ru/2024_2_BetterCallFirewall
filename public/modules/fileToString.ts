import api from '../api/api';

const fileToString = async (file: File): Promise<string | null> => {
	let fileStr;
	if (file.size) {
		fileStr = await api.sendImage(file);
		if (!fileStr) {
			return null;
		}
	} else {
		fileStr = '';
	}
	return fileStr;
};

export default fileToString;

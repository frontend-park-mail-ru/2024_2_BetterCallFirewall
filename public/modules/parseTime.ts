const options: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	timeZoneName: 'short',
};

const parseTime = (isoDate: string) => {
	const date = new Date(isoDate);
	return date.toLocaleString('ru-RU', options);
};

export default parseTime;

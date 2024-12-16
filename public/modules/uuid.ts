export const uuid = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0; // Генерация случайного числа от 0 до 15
		const v = c === 'x' ? r : (r & 0x3) | 0x8; // Установка версии UUID
		return v.toString(16); // Преобразование в шестнадцатеричное представление
	});
};

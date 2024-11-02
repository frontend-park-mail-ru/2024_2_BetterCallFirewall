export type ErrorMessages = Record<string, string>;

export const ERROR_MESSAGES: ErrorMessages = {
	'user not found': 'Пользователь не найден',
	'user already exists': 'Пользователь уже существует',
	'no auth': 'Не авторизован',
	'wrong email or password': 'Неверный email или пароль',
	'file too large': 'Файл слишком большой',
	'wrong type of file': 'Неверный тип файла',
	'post not found': 'Пост не найден',
	'profile not found': 'Профиль не найден',
};

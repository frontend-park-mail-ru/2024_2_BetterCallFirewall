export interface User {
	[key: string]: string; // Индексная сигнатура, чтобы IDE знал, что ключом это Record<string, string>
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

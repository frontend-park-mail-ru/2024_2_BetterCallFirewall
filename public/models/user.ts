export interface User {
	[key: string]: string; // Индексная сигнатура, чтобы IDE знал, что это Record<string, string>
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

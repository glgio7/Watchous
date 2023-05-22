export interface IUser {
	id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	createdAt: string;
	token?: string;
	profileIcon?: string;
}

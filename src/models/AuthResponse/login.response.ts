export interface LoginResponse
{
	token: string;
	isAuthorized: boolean;
	userId: string;
}
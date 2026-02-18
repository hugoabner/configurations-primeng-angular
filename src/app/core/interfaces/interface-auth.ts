/**
 * Archivo: interface-auth.ts
 * Descripción: Interface para manejar la respuesta de la autenticación.
 * Autor: [hugo]
 * Fecha: [2024-06-10]
 */

interface AuthErrorResponse {
	timestamp: string;
	status: number;
	error: string;
	message: string;
	path: string;
}

interface AuthSuccessResponse {
	name: string;
	roles: string[];
	token: string;
	nombre: string | null;
	accessToken: string;
}

export type AuthResponse = AuthErrorResponse | AuthSuccessResponse;

/**
 * Interfaces para la autenticación de Google, pueden ser extendidas según las necesidades
 * de la aplicación y la respuesta que se reciba del backend.
 * 
 */
interface GoogleAuthSuccessResponse {
	status: number;
	message: string;
	access_token: string;
}

interface GoogleAuthErrorResponse {
	timestamp: string;
	status: number;
	error: string;
	message: string;
	path: string;
	ip: string;
	ip2: string;
}

export type GoogleAuthResponse = GoogleAuthSuccessResponse | GoogleAuthErrorResponse;


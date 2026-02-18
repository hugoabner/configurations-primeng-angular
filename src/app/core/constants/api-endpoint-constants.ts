export const API_ENDPOINTS = {
	AUTH: {
		GOOGLE_OAUTH: '/utilitarios/google/oauth/token',
		LOGIN: '/auth/signin',
		REGISTER: '/auth/register',
		LOGOUT: '/auth/logout',
		REFRESH_TOKEN: '/auth/refresh-token',
	},
} as const;

export const API_VERSIONS = {
	V1: '/api/v1',
	V2: '/api/v2',
} as const;
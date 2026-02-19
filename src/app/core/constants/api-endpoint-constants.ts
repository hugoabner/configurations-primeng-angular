export const API_ENDPOINTS = {
	AUTH: {
		GOOGLE_OAUTH: '/utilitarios/google/oauth/token',
		LOGIN: '/auth/signin',
		REGISTER: '/auth/register',
		LOGOUT: '/auth/logout',
		REFRESH_TOKEN: '/auth/refresh-token',
	},
	STORAGE_BUCKET: {
		IMPORT_BATCH_DETAIL: '/download/storage/v1/b/gerenciariesgos-1-bucket/o',
		IMPORT_BATCH_HISTORY: '/storage/v1/b/gerenciariesgos-1-bucket/o',
	}
} as const;

export const API_VERSIONS = {
	V1: '/api/v1',
	V2: '/api/v2',
} as const;
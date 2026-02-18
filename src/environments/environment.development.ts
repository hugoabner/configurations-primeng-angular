/**
 * Environments configuration file.
 * @example
 * apiUrl: 'http://localhost:3000/api'
 * production: false
 * Este environment es para desarrollo, no se debe usar en producción.
 */
export const environment = {
  production: false,
  apiUrl: 'https://www.karlossegurosdeautos.com',
  bucketUrl: 'https://storage.googleapis.com/download/storage/v1',
  // GCS_BUCKET_URL
  gcsBucketUrl: 'https://storage.googleapis.com/download/storage/v1/b/gerenciariesgos-1-bucket/o',
  auth: {
    username: 'KarlosBot',
    password: 'P$072@Z0$3y0@OOr',
  },
};

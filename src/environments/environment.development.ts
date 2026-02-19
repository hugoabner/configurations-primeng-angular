/**
 * Environments configuration file.
 * @example
 * apiUrl: 'http://localhost:3000/api'
 * production: false
 * Este environment es para desarrollo, no se debe usar en producción.
 */
export const environment = {
  production: false,
  /**
   * URL de la API de Karlos Seguros de Autos
   */
  apiUrl: 'https://www.karlossegurosdeautos.com',
  /**
   * URL del bucket de Google Cloud Storage para acceder a los archivos de pólizas
   */
  gcsBucketUrl: 'https://storage.googleapis.com',
  auth: {
    username: 'KarlosBot',
    password: 'P$072@Z0$3y0@OOr',
  },
};

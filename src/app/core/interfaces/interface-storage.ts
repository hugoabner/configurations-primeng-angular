/**
 * Interfaz para la respuesta de la API de Google Cloud Storage
 * @interface StorageResponse
 * 
 */

export interface ExcelData {
  id: string;
  TIPODOC: string;
  DOCUMENTO: string;
  ASEGURADO: string;
  CONTRATANTE: string;
  ENDOSATARIO: string;
  TELEFONO: string;
  CORREO: string;
  "NRO POLIZA": string;
  "ESTADO RENOVACION": string;
  "ESTADO EMISION": string;
  "SUB ESTADO": string;
  "NRO RENOVACION": string;
  "NRO VEHICULO": string;
  USUARIO: string;
  "FECHA INICIO DE VIG": string;
  "FECHA FIN DE VIG": string;
  "CIA SEGUROS": string;
  PRODUCTO: string;
  "GPS OBLIGATORIO": string;
  COBERTURA: string;
  USO: string;
  CLASE: string;
  "TIENE GPS": string;
  MARCA: string;
  MODELO: string;
  ANIO: string;
  PLACA: string;
  TIMON: string;
  COLOR: string;
  "NRO MOTOR": string;
  "NRO CHASIS": string;
  "SUM ASEG": string;
  formaPago: string | null;
  descPlanFinanciamiento: string | null;
  nroCuotas: number | null;
  importeCuotas: number | null;
  "TIPO MONEDA": string;
  "PRIMA NETA": string;
  TASA: string;
  "FECHA ALERTA": string | null;
}

// Interfaz para los datos del array "antes"
export interface AntesData {
  tipo: string;
  data: any | null;
  errorGenerico: string;
}

// Interfaz para los datos del objeto "operacion"
export interface OperacionData {
  estado: string;
  mensaje: string;
  tipo: string;
  errorGenerico: string;
}

// Interfaz principal para cada elemento del array
export interface StorageResponse {
  excel: ExcelData;
  antes: AntesData[];
  operacion: OperacionData;
}



/**
 * Interfaz para la respuesta de la API de Google Cloud Storage 
 * al listar objetos en un bucket
 * @interface StorageObjects
 */
export interface StorageObjects {
  kind: string;
  items: StorageObject[];
}

// Interfaz para cada objeto dentro de "items"
export interface StorageObject {
  kind: string;
  id: string;
  selfLink: string;
  mediaLink: string;
  name: string;
  bucket: string;
  generation: string;
  metageneration: string;
  contentType: string;
  storageClass: string;
  size: string;
  md5Hash: string;
  crc32c: string;
  etag: string;
  timeCreated: string;
  updated: string;
  timeStorageClassUpdated: string;
  timeFinalized: string;
  metadata: Metadata;
}

// Interfaz para el objeto "metadata"
export interface Metadata {
  success: string;
  name: string;
  createdBy: string;
  createdDate: string;
  error: string;
  total: string;
  status: string;
}


export interface BatchHistoryItem {
  id: string;            // El path completo para el fetch (ej: polizasBatch/json/...)
  fileName: string;      // Nombre amigable (ENERO25MARZO26)
  fullPath: string;      // polizasBatch/json/ENERO25...
  createdAt: Date;       // Objeto Date real para pipes de fecha
  completedAt: Date;     // Fecha de finalización
  status: string;
  stats: {
    success: number;
    error: number;
    total: number;
    accuracy: number;    // % de éxito (útil para indicadores visuales)
  };
  sizeBytes: number;     // Tamaño del archivo en bytes
  user: string;          // Quién lo creó
}
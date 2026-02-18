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
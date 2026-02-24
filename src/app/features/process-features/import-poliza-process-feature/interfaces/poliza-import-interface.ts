export interface PolizaViewRow {
  nroPoliza: string;
  nroRenovacion: string | number;
  campo: string;
  valorAnterior: any;
  valorNuevo: any;
  tipo: string;
}
export interface Column {
    field: string;
    header: string;
    filterType?: string; // Agregamos un nuevo atributo para el tipo de filtro
}
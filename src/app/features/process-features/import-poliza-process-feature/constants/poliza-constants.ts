interface Column {
    field: string;
    header: string;
    filterType?: string; // Agregamos un nuevo atributo para el tipo de filtro
}

export const COLUMNS_STORAGE_TABLE: Column[] = [
  { field: 'excel.TIPODOC', header: 'Tipo de Doc.', filterType: 'multiselect' }, 
  { field: 'excel.DOCUMENTO', header: 'Número de Documento', filterType: 'text' }, 
  { field: 'excel.ASEGURADO', header: 'Nombre Completo', filterType: 'text' }, 
  { field: 'excel.CONTRATANTE', header: 'Contratante', filterType: 'text' }, 
  { field: 'excel.ENDOSATARIO', header: 'Endosatario', filterType: 'text' }, 
  { field: 'excel.TELEFONO', header: 'Teléfono', filterType: 'text' }, 
  { field: 'excel.CORREO', header: 'Correo Electrónico', filterType: 'text' }, 
  { field: 'excel.NRO POLIZA', header: 'Número de Póliza', filterType: 'text' }, 
  { field: 'excel.ESTADO RENOVACION', header: 'Estado de Renovación', filterType: 'multiselect' }, 
  { field: 'excel.ESTADO EMISION', header: 'Estado de Emisión', filterType: 'multiselect' }, 
  { field: 'excel.SUB ESTADO', header: 'Sub Estado', filterType: 'text' }, 
  { field: 'excel.NRO RENOVACION', header: 'Número de Renovación', filterType: 'text' }, 
  { field: 'excel.NRO VEHICULO', header: 'Número de Vehículo', filterType: 'text' }, 
  { field: 'excel.USUARIO', header: 'Usuario', filterType: 'multiselect' }, 
  { field: 'excel.FECHA INICIO DE VIG', header: 'Fecha de Inicio de Vigencia', filterType: 'text' }, 
  { field: 'excel.FECHA FIN DE VIG', header: 'Fecha de Fin de Vigencia', filterType: 'text' }, 
  { field: 'excel.CIA SEGUROS', header: 'Compañía de Seguros', filterType: 'text' }, 
  { field: 'excel.PRODUCTO', header: 'Producto', filterType: 'text' }, 
  { field: 'excel.GPS OBLIGATORIO', header: 'GPS Obligatorio', filterType: 'text' }, 
  { field: 'excel.COBERTURA', header: 'Cobertura', filterType: 'text' }, 
  { field: 'excel.USO', header: 'Uso', filterType: 'text' }, 
  { field: 'excel.CLASE', header: 'Clase', filterType: 'text' }, 
  { field: 'excel.TIENE GPS', header: 'Tiene GPS', filterType: 'text' }, 
  { field: 'excel.MARCA', header: 'Marca', filterType: 'text' }, 
  { field: 'excel.MODELO', header: 'Modelo', filterType: 'text' }, 
  { field: 'excel.ANIO', header: 'Año', filterType: 'text' }, 
  { field: 'excel.PLACA', header: 'Placa', filterType: 'text' }, 
  { field: 'excel.TIMON', header: 'Timón', filterType: 'text' }, 
  { field: 'excel.COLOR', header: 'Color', filterType: 'text' }, 
  { field: 'excel.NRO MOTOR', header: 'Número de Motor', filterType: 'text' }, 
  { field: 'excel.NRO CHASIS', header: 'Número de Chasis', filterType: 'text' }, 
  { field: 'excel.SUM ASEG', header: 'Suma Asegurada', filterType: 'text' }, 
  { field: 'excel.formaPago', header: 'Forma de Pago', filterType: 'text' },
  { field: 'excel.descPlanFinanciamiento', header: 'Descripción Plan Financiamiento', filterType: 'text' },
  { field: 'excel.nroCuotas', header: 'Número de Cuotas', filterType: 'text' },
  { field: 'excel.importeCuotas', header: 'Importe de Cuotas', filterType: 'text' },
  { field: 'excel.TIPO MONEDA', header: 'Tipo de Moneda', filterType: 'multiselect' }, 
  { field: 'excel.PRIMA NETA', header: 'Prima Neta', filterType: 'text' }, 
  { field: 'excel.TASA', header: 'Tasa', filterType: 'text' },
  { field: 'excel.FECHA ALERTA', header: 'Fecha de Alerta', filterType: 'text' },
  
  // operacion 
  { field: 'operacion.estado', header: 'Estado Operación', filterType: 'multiselect' },
  { field: 'operacion.mensaje', header: 'Mensaje Operación', filterType: 'text' },
  { field: 'operacion.errorGenerico', header: 'Error Genérico', filterType: 'multiselect' },

  // { field: 'descPlanFinanciamiento', header: 'Descripción del Plan de Financiamiento' },
  // { field: 'nroCuotas', header: 'Número de Cuotas' },
  // { field: 'importeCuotas', header: 'Importe de Cuotas' },
];
 
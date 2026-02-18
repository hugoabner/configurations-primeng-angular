interface Column {
    field: string;
    header: string;
}

export const COLUMNS_POLIZA_TABLE: Column[] = [
  { field: 'renovacion_id', header: 'Id' },
  // datos del asegurado
  { field: 'tipo_documento', header: 'Tipo de Documento' },
  { field: 'numero_documento', header: 'Número de Documento' },
  { field: 'nombre_completo', header: 'Nombre Completo' },
  { field: 'telefono', header: 'Teléfono' },
  { field: 'correo_electronico', header: 'Correo Electronico' },

  // datos del vehiculo
  { field: 'usuario_cotizacion', header: 'Usuario' },
  { field: 'uso_descripcion', header: 'Uso del Vehículo' },
  { field: 'clase_descripcion', header: 'Clase del Vehículo' },
  { field: 'marca_descripcion', header: 'Marca del Vehículo' },
  { field: 'modelo_descripcion', header: 'Modelo del Vehículo' },
  { field: 'version', header: 'Versión' },
  { field: 'codigo_modelo_cia', header: 'Código del Modelo de la Compañía' },
  { field: 'descripcion_modelo_cia', header: 'Descripción del Modelo de la Compañía' },
  { field: 'anio_vehiculo', header: 'Año del Vehículo' },
  { field: 'suma_asegurada', header: 'Suma Asegurada' },
  { field: 'numero_cotizacion_aseguradora', header: 'Número de Cotización de la Aseguradora' },
  { field: 'prima_total', header: 'Prima Total' },
  { field: 'prima_mensual_con_descuento', header: 'Prima Mensual con Descuento' },
  { field: 'prima_total_real', header: 'Prima Total Real' },
  { field: 'prima_mensual', header: 'Prima Mensual' },
  { field: 'nombre_aseguradora', header: 'Aseguradora' },
  { field: 'agrupador_descripcion', header: 'Agrupador' },
  { field: 'agrupador_orden', header: 'Orden del Agrupador' },
  { field: 'agrupador_resenia', header: 'Reseña del Agrupador' },
  { field: 'numero_anios_vigencia_poliza', header: 'Número de Años de Vigencia de la Póliza' },
  { field: 'descripcion_tipo_cobertura', header: 'Descripción del Tipo de Cobertura' },
  { field: 'producto_descripcion', header: 'Descripción del Producto' },
  { field: 'tasa', header: 'Tasa' },
  { field: 'prima_por_descuento', header: 'Tasa Real' },

  { field: 'agrupador_id', header: 'Id del Agrupador' },
  { field: 'requiere_gps', header: 'Requiere GPS' },
  { field: 'descripcion_tipo_inspeccion', header: 'Descripción del Tipo de Inspección' },
  { field: 'url_cotizacion', header: 'URL de la Cotización' },

  // datos del resultado
  { field: 'resultado_estado', header: 'Estado del Resultado' },
  { field: 'resultado_mensaje', header: 'Mensaje del Resultado' },
];

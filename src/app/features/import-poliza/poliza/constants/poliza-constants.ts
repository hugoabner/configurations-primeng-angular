type PolizaColumn = {
  key: string;
  label: string;
  class?: string;
};

export const COLUMNS_POLIZA_TABLE: PolizaColumn[] = [
  { key: 'renovacion_id', label: 'Id' },
  // datos del asegurado
  { key: 'tipo_documento', label: 'Tipo de Documento' },
  { key: 'numero_documento', label: 'Número de Documento' },
  { key: 'nombre_completo', label: 'Nombre Completo' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'correo_electronico', label: 'Correo Electronico' },

  // datos del vehiculo
  { key: 'usuario_cotizacion', label: 'Usuario' },
  { key: 'uso_descripcion', label: 'Uso del Vehículo' },
  { key: 'clase_descripcion', label: 'Clase del Vehículo' },
  { key: 'marca_descripcion', label: 'Marca del Vehículo' },
  { key: 'modelo_descripcion', label: 'Modelo del Vehículo' },
  { key: 'version', label: 'Versión' },
  { key: 'codigo_modelo_cia', label: 'Código del Modelo de la Compañía' },
  { key: 'descripcion_modelo_cia', label: 'Descripción del Modelo de la Compañía' },
  { key: 'anio_vehiculo', label: 'Año del Vehículo' },
  { key: 'suma_asegurada', label: 'Suma Asegurada' },
  { key: 'numero_cotizacion_aseguradora', label: 'Número de Cotización de la Aseguradora' },
  { key: 'prima_total', label: 'Prima Total' },
  { key: 'prima_mensual_con_descuento', label: 'Prima Mensual con Descuento' },
  { key: 'prima_total_real', label: 'Prima Total Real' },
  { key: 'prima_mensual', label: 'Prima Mensual' },
  { key: 'nombre_aseguradora', label: 'Aseguradora' },
  { key: 'agrupador_descripcion', label: 'Agrupador' },
  { key: 'agrupador_orden', label: 'Orden del Agrupador' },
  { key: 'agrupador_resenia', label: 'Reseña del Agrupador' },
  { key: 'numero_anios_vigencia_poliza', label: 'Número de Años de Vigencia de la Póliza' },
  { key: 'descripcion_tipo_cobertura', label: 'Descripción del Tipo de Cobertura' },
  { key: 'producto_descripcion', label: 'Descripción del Producto' },
  { key: 'tasa', label: 'Tasa' },
  { key: 'prima_por_descuento', label: 'Tasa Real' },

  { key: 'agrupador_id', label: 'Id del Agrupador' },
  { key: 'requiere_gps', label: 'Requiere GPS' },
  { key: 'descripcion_tipo_inspeccion', label: 'Descripción del Tipo de Inspección' },
  { key: 'url_cotizacion', label: 'URL de la Cotización' },

  // datos del resultado
  { key: 'resultado_estado', label: 'Estado del Resultado' },
  { key: 'resultado_mensaje', label: 'Mensaje del Resultado' },
];

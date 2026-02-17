import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  getData() {
    return [
      {
        renovacion_id: 1001,

        // datos del asegurado
        tipo_documento: 'DNI',
        numero_documento: '45879632',
        nombre_completo: 'Carlos Manuel Gamboa',
        telefono: '987654321',
        correo_electronico: 'carlos.gamboa@email.com',

        // datos del vehículo
        usuario_cotizacion: 'hugo.palomino',
        uso_descripcion: 'Particular',
        clase_descripcion: 'Automóvil',
        marca_descripcion: 'Toyota',
        modelo_descripcion: 'Corolla',
        version: '1.8 CVT',
        codigo_modelo_cia: 'TY-COR-2023-01',
        descripcion_modelo_cia: 'Toyota Corolla 1.8 Full Equipo',
        anio_vehiculo: 2023,
        suma_asegurada: 65000,
        numero_cotizacion_aseguradora: 'COT-ASEG-001245',
        prima_total: 3200,
        prima_mensual_con_descuento: 250,
        prima_total_real: 3000,
        prima_mensual: 270,
        nombre_aseguradora: 'Rimac Seguros',
        agrupador_descripcion: 'Premium',
        agrupador_orden: 1,
        agrupador_resenia: 'Cobertura completa con beneficios adicionales',
        numero_anios_vigencia_poliza: 1,
        descripcion_tipo_cobertura: 'Todo Riesgo',
        producto_descripcion: 'Auto Seguro Plus',
        tasa: 4.9,
        prima_por_descuento: 4.5,

        agrupador_id: 10,
        requiere_gps: true,
        descripcion_tipo_inspeccion: 'Inspección Virtual',
        url_cotizacion: 'https://seguros.com/cotizacion/1001',

        // datos del resultado
        resultado_estado: 'APROBADO',
        resultado_mensaje: 'Cotización generada correctamente',
      },
      {
        renovacion_id: 1002,

        tipo_documento: 'CE',
        numero_documento: 'X1234567',
        nombre_completo: 'María Fernanda López',
        telefono: '912345678',
        correo_electronico: 'maria.lopez@email.com',

        usuario_cotizacion: 'asesor01',
        uso_descripcion: 'Taxi',
        clase_descripcion: 'SUV',
        marca_descripcion: 'Hyundai',
        modelo_descripcion: 'Tucson',
        version: '2.0 GLS',
        codigo_modelo_cia: 'HY-TUC-2022-05',
        descripcion_modelo_cia: 'Hyundai Tucson GLS 2.0 Automática',
        anio_vehiculo: 2022,
        suma_asegurada: 78000,
        numero_cotizacion_aseguradora: 'COT-ASEG-001246',
        prima_total: 4800,
        prima_mensual_con_descuento: 380,
        prima_total_real: 4500,
        prima_mensual: 400,
        nombre_aseguradora: 'Pacífico Seguros',
        agrupador_descripcion: 'Estándar',
        agrupador_orden: 2,
        agrupador_resenia: 'Cobertura básica ampliada',
        numero_anios_vigencia_poliza: 1,
        descripcion_tipo_cobertura: 'Responsabilidad Civil',
        producto_descripcion: 'Seguro Vehicular Básico',
        tasa: 6.2,
        prima_por_descuento: 5.8,

        agrupador_id: 20,
        requiere_gps: false,
        descripcion_tipo_inspeccion: 'Inspección Presencial',
        url_cotizacion: 'https://seguros.com/cotizacion/1002',

        resultado_estado: 'PENDIENTE',
        resultado_mensaje: 'En evaluación por la aseguradora',
      },
      {
        renovacion_id: 1001,
        tipo_documento: 'DNI',
        numero_documento: '45879632',
        nombre_completo: 'Carlos Manuel Gamboa',
        telefono: '987654321',
        correo_electronico: 'carlos.gamboa@email.com',
        usuario_cotizacion: 'hugo.palomino',
        uso_descripcion: 'Particular',
        clase_descripcion: 'Automóvil',
        marca_descripcion: 'Toyota',
        modelo_descripcion: 'Corolla',
        version: '1.8 CVT',
        codigo_modelo_cia: 'TY-COR-2023-01',
        descripcion_modelo_cia: 'Toyota Corolla 1.8 Full Equipo',
        anio_vehiculo: 2023,
        suma_asegurada: 65000,
        numero_cotizacion_aseguradora: 'COT-ASEG-001245',
        prima_total: 3200,
        prima_mensual_con_descuento: 250,
        prima_total_real: 3000,
        prima_mensual: 270,
        nombre_aseguradora: 'Rimac Seguros',
        agrupador_descripcion: 'Premium',
        agrupador_orden: 1,
        agrupador_resenia: 'Cobertura completa con beneficios adicionales',
        numero_anios_vigencia_poliza: 1,
        descripcion_tipo_cobertura: 'Todo Riesgo',
        producto_descripcion: 'Auto Seguro Plus',
        tasa: 4.9,
        prima_por_descuento: 4.5,
        agrupador_id: 10,
        requiere_gps: true,
        descripcion_tipo_inspeccion: 'Inspección Virtual',
        url_cotizacion: 'https://seguros.com/cotizacion/1001',
        resultado_estado: 'APROBADO',
        resultado_mensaje: 'Cotización generada correctamente',
      },
      {
        renovacion_id: 1002,
        tipo_documento: 'CE',
        numero_documento: 'X1234567',
        nombre_completo: 'María Fernanda López',
        telefono: '912345678',
        correo_electronico: 'maria.lopez@email.com',
        usuario_cotizacion: 'asesor01',
        uso_descripcion: 'Taxi',
        clase_descripcion: 'SUV',
        marca_descripcion: 'Hyundai',
        modelo_descripcion: 'Tucson',
        version: '2.0 GLS',
        codigo_modelo_cia: 'HY-TUC-2022-05',
        descripcion_modelo_cia: 'Hyundai Tucson GLS 2.0 Automática',
        anio_vehiculo: 2022,
        suma_asegurada: 78000,
        numero_cotizacion_aseguradora: 'COT-ASEG-001246',
        prima_total: 4800,
        prima_mensual_con_descuento: 380,
        prima_total_real: 4500,
        prima_mensual: 400,
        nombre_aseguradora: 'Pacífico Seguros',
        agrupador_descripcion: 'Estándar',
        agrupador_orden: 2,
        agrupador_resenia: 'Cobertura básica ampliada',
        numero_anios_vigencia_poliza: 1,
        descripcion_tipo_cobertura: 'Responsabilidad Civil',
        producto_descripcion: 'Seguro Vehicular Básico',
        tasa: 6.2,
        prima_por_descuento: 5.8,
        agrupador_id: 20,
        requiere_gps: false,
        descripcion_tipo_inspeccion: 'Inspección Presencial',
        url_cotizacion: 'https://seguros.com/cotizacion/1002',
        resultado_estado: 'PENDIENTE',
        resultado_mensaje: 'En evaluación por la aseguradora',
      },
      {
        renovacion_id: 1003,
        tipo_documento: 'DNI',
        numero_documento: '74125896',
        nombre_completo: 'Luis Alberto Ramírez',
        telefono: '934567812',
        correo_electronico: 'luis.ramirez@email.com',
        usuario_cotizacion: 'asesor02',
        uso_descripcion: 'Particular',
        clase_descripcion: 'Sedán',
        marca_descripcion: 'Kia',
        modelo_descripcion: 'Rio',
        version: '1.4 MT',
        codigo_modelo_cia: 'KIA-RIO-2021',
        descripcion_modelo_cia: 'Kia Rio 1.4 Mecánico',
        anio_vehiculo: 2021,
        suma_asegurada: 42000,
        numero_cotizacion_aseguradora: 'COT-ASEG-001247',
        prima_total: 2100,
        prima_mensual_con_descuento: 170,
        prima_total_real: 1950,
        prima_mensual: 185,
        nombre_aseguradora: 'La Positiva',
        agrupador_descripcion: 'Económico',
        agrupador_orden: 3,
        agrupador_resenia: 'Cobertura básica',
        numero_anios_vigencia_poliza: 1,
        descripcion_tipo_cobertura: 'Responsabilidad Civil',
        producto_descripcion: 'Seguro Auto Básico',
        tasa: 5.2,
        prima_por_descuento: 4.9,
        agrupador_id: 30,
        requiere_gps: false,
        descripcion_tipo_inspeccion: 'Inspección Virtual',
        url_cotizacion: 'https://seguros.com/cotizacion/1003',
        resultado_estado: 'APROBADO',
        resultado_mensaje: 'Cotización emitida',
      },
    ];
  }
  // {
  //   id: 1015,
  //   name: 'Mattie Poquette',
  //   country: {
  //     name: 'Venezuela',
  //     code: 've',
  //   },
  //   company: 'Century Communications',
  //   date: '2017-12-12',
  //   status: 'negotiation',
  //   verified: false,
  //   activity: 52,
  //   representative: {
  //     name: 'Anna Fali',
  //     image: 'annafali.png',
  //   },
  //   balance: 64533,
  // },
  constructor(private http: HttpClient) {}

  getCustomersMini() {
    return Promise.resolve(this.getData().slice(0, 5));
  }

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  }

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  }

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  }

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  }

  getCustomers(params?: any) {
    return this.http
      .get<any>('https://www.primefaces.org/data/customers', { params: params })
      .toPromise();
  }
}

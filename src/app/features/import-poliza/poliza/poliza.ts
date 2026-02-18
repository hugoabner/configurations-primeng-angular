import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from "primeng/button";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Tooltip } from "primeng/tooltip";
import { CustomerService } from '../../../core/services/customer-service';
import { COLUMNS_POLIZA_TABLE } from './constants/poliza-constants';

export type ResultadoEstado = 'APROBADO' | 'PENDIENTE' | 'RECHAZADO';

export interface Poliza {
  renovacion_id: number;

  tipo_documento: 'DNI' | 'CE' | 'RUC' | string;

  numero_documento: string;
  nombre_completo: string;
  telefono: string;
  correo_electronico: string;

  usuario_cotizacion: string;
  uso_descripcion: string;
  clase_descripcion: string;
  marca_descripcion: string;
  modelo_descripcion: string;
  version: string;
  codigo_modelo_cia: string;
  descripcion_modelo_cia: string;

  anio_vehiculo: number;
  suma_asegurada: number;

  numero_cotizacion_aseguradora: string;

  prima_total: number;
  prima_mensual_con_descuento: number;
  prima_total_real: number;
  prima_mensual: number;

  nombre_aseguradora: string;

  agrupador_descripcion: string;
  agrupador_orden: number;
  agrupador_resenia: string;

  numero_anios_vigencia_poliza: number;
  descripcion_tipo_cobertura: string;
  producto_descripcion: string;

  tasa: number;
  prima_por_descuento: number;

  agrupador_id: number;
  requiere_gps: boolean;

  descripcion_tipo_inspeccion: string;
  url_cotizacion: string;

  resultado_estado: ResultadoEstado;
  resultado_mensaje: string;
}


interface Column {
    field: string;
    header: string;
}
@Component({
  selector: 'app-poliza',
  imports: [
    SelectModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    MultiSelectModule,
    TableModule,
    TagModule,
    InputTextModule,
    FormsModule,
    Button,
    Tooltip,
],
  templateUrl: './poliza.html',
  styleUrl: './poliza.css',
  providers: [CustomerService]
})
export class Poliza implements OnInit {


  
  private customerService = inject(CustomerService);
  customers!: Poliza[];
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  cols!: Column[];
  selectedColumns!: Column[];
  ngOnInit() {
  
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers as Poliza[];
      this.loading = false;
      // this.customers.forEach((customer) => (customer. = new Date(<Date>customer.date)));
    });  
    this.cols = COLUMNS_POLIZA_TABLE;
    this.selectedColumns = [...this.cols]; // Inicialización con todas las columnas
  }
  onColumnChange(selected: Column[]) {
    // Ordena las columnas seleccionadas según el orden original de 'cols'
    this.selectedColumns = this.cols.filter((col) =>
      selected.some((v) => v.field === col.field)
    );
  }

}

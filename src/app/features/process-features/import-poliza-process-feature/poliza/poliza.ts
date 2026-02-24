import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { finalize } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {
  AntesData,
  BatchHistoryItem,
  CambioData,
  StorageResponse,
} from '../../../../core/interfaces/interface-storage';
import { ExcelService } from '../../../../core/services';
import { BucketService } from '../../../../core/services/bucket-service/bucket-service';
import { BatchHistoryPopover } from '../components/batch-history-popover/batch-history-popover';
import { COLUMNS_STORAGE_TABLE } from '../constants/poliza-constants';
import { PolizaViewRow } from '../interfaces/poliza-import-interface';

interface Column {
  field: string;
  header: string;
  filterType?: string;
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
    RippleModule,
    ToastModule,
    MenuModule,
    Tooltip,
    SkeletonModule,
    BatchHistoryPopover,
  ],
  templateUrl: './poliza.html',
  styleUrl: './poliza.css',
  providers: [MessageService, PopoverModule],
})
export class Poliza implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _bucketService = inject(BucketService);
  private _messageService = inject(MessageService);
  private _router = inject(Router);
  private _excelService = inject(ExcelService);

  constructor() {}

  // table objects
  history_polizas = signal<StorageResponse[]>([]);
  loading: boolean = true;
  cols: Column[] = COLUMNS_STORAGE_TABLE;
  selectedColumns: Column[] = COLUMNS_STORAGE_TABLE;

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      const cache = params['cache'];
      const nameHistory = params['name_history'];
      // si no existe name_history no hacemos nada, porque no sabemos qué historial cargar
      if (!nameHistory) {
        this.history_polizas.set([]);
        this.importBatchHistory.set([]);
        this.loading = false;
        return;
      }
      this.loadDataFromBucket(nameHistory, Boolean(cache));
    });
  }

  onColumnChange(selected: Column[]) {
    this.selectedColumns = this.cols.filter((col) => selected.some((v) => v.field === col.field));
  }

  loadDataFromBucket(name: string, cache?: boolean) {
    this.loading = true;
    this._bucketService.getImportBatchDetail(name, cache).subscribe({
      next: (data: StorageResponse[]) => {
        // console.log(JSON.stringify(data, null, 2));
        this.history_polizas.set(data);
        this.loading = false;
        // this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      },
    });
  }

  /**
   * Button Historial de importacion de Polizas
   */
  importBatchHistory = signal<BatchHistoryItem[]>([]);
  loadingHistory = signal<boolean>(false);

  public loadHistory() {
    this.loadingHistory.set(true);
    this._bucketService
      .getImportBatchHistory()
      .pipe(finalize(() => this.loadingHistory.set(false)))
      .subscribe({
        next: (data) => this.importBatchHistory.set(data),
        error: (err) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ups, ocurrió un error al cargar el historial.',
          });
        },
      });
  }

  public onBatchSelected(batch: BatchHistoryItem) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        cache: 'true',
        name_history: encodeURIComponent(batch.id),
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Exportamos los datos a Excel
   */
  public exportExcel(items: StorageResponse[]) {
    if (!items || items.length === 0) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'No hay datos para exportar',
      });
      return;
    }
    const dataToExport = items.map((item) => ({
      TIPODOC: item.excel.TIPODOC, // Asume que estas son tus keys en ExcelData
      DOCUMENTO: item.excel.DOCUMENTO,
      ASEGURADO: item.excel.ASEGURADO,
      CONTRATANTE: item.excel.CONTRATANTE,
      ENDOSATARIO: item.excel.ENDOSATARIO,
      TELEFONO: item.excel.TELEFONO,
      CORREO: item.excel.CORREO,
      'NRO POLIZA': item.excel['NRO POLIZA'],
      'ESTADO RENOVACION': item.excel['ESTADO RENOVACION'],
      'ESTADO EMISION': item.excel['ESTADO EMISION'],
      'SUB ESTADO': item.excel['SUB ESTADO'],
      'NRO RENOVACION': item.excel['NRO RENOVACION'],
      'NRO VEHICULO': item.excel['NRO VEHICULO'],
      USUARIO: item.excel['USUARIO'],
      'FECHA INICIO DE VIG': item.excel['FECHA INICIO DE VIG'],
      'FECHA FIN DE VIG': item.excel['FECHA FIN DE VIG'],
      'CIA SEGUROS': item.excel['CIA SEGUROS'],
      PRODUCTO: item.excel['PRODUCTO'],
      'GPS OBLIGATORIO': item.excel['GPS OBLIGATORIO'] ? 'SÍ' : 'NO',
      COBERTURA: item.excel['COBERTURA'],
      USO: item.excel['USO'],
      CLASE: item.excel['CLASE'],
      'TIENE GPS': item.excel['TIENE GPS'] ? 'SÍ' : 'NO',
      MARCA: item.excel['MARCA'],
      MODELO: item.excel['MODELO'],
      ANIO: item.excel['ANIO'],
      PLACA: item.excel['PLACA'],
      TIMON: item.excel['TIMON'],
      COLOR: item.excel['COLOR'],
      'NRO MOTOR': item.excel['NRO MOTOR'],
      'NRO CHASIS': item.excel['NRO CHASIS'],
      'SUM ASEG': item.excel['SUM ASEG'],
      'FORMA PAGO': item.excel.formaPago,
      'DESCRIPCION PLAN': item.excel.descPlanFinanciamiento,
      'NRO CUOTAS': item.excel.nroCuotas,
      'IMPORTE CUOTAS': item.excel.importeCuotas,
      'TIPO MONEDA': item.excel['TIPO MONEDA'],
      'PRIMA NETA': item.excel['PRIMA NETA'],
      TASA: item.excel['TASA'],
      'FECHA ALERTA': item.excel['FECHA ALERTA'],
    }));
    try {
      const fileName = `Reporte_Polizas_${new Date().toISOString().slice(0, 10)}.xlsx`;
      this._excelService.exportAsExcelFile(dataToExport, fileName, 'Datos');
      this._messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: `Excel "${fileName}" generado con ${items.length} filas`,
      });
    } catch (error) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo generar el archivo Excel',
      });
    }
  }

  public viewOriginalExcel() {
    const params = this._activatedRoute.snapshot.queryParams;
    const nameHistory = params['name_history'];
    // validar que name_history exista
    if (!nameHistory) {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Selecciona un historial para poder ver el excel original.',
      });
      return;
    }
    const urlDecoded = decodeURIComponent(nameHistory);
    const fileName = urlDecoded.split('/').pop() ?? ''; // ELIMINADAS_2026-01-27 22:59:09
    const url =
      environment.gcsBucketUrl +
      '/gerenciariesgos-1-bucket' +
      `/polizasBatch/excel/${decodeURIComponent(fileName) || ''}`;
    //decodificar i saca extrer solo las iniciales polizasBatch/excel/
    this._bucketService.generateUrl(url).subscribe({
      next: (res) => {
        if (res.url) {
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(res.url)}`,
            '_blank',
          );
        }
      },
      error: (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error || 'No se pudo generar la URL para el archivo original',
        });
      },
    });
  }

  filterOptions = computed(() => {
    const data = this.history_polizas();
    const optionsMap: Record<string, { name: string; value: any }[]> = {};
    this.cols
      .filter((c) => c.filterType === 'multiselect')
      .forEach((col) => {
        // Función auxiliar para obtener valor por string path (ej: "excel.TIPODOC")
        const getNestedValue = (obj: any, path: string) => {
          return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        };
        const uniqueValues = [...new Set(data.map((item) => getNestedValue(item, col.field)))]
          .filter((val) => val !== null && val !== undefined && val !== '')
          .map((val) => ({ name: String(val), value: val }));
        optionsMap[col.field] = uniqueValues;
      });
    return optionsMap;
  });

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  /**
   *
   * @method viewPolizas
   * @returns
   */
  viewPolizas(polizas: StorageResponse[]) {
    if (!polizas?.length) {
      this.showWarning('No hay datos de pólizas para mostrar.');
      return;
    }
    const params = this._activatedRoute.snapshot.queryParams;
    const nameHistory = params['name_history'];
    const formattedData: PolizaViewRow[] = this.processPolizasToView(polizas);
    // generar excel con formattedData
    formattedData.map((row) => ({
        CAMPO: row.campo,
        NROPOLIZA: row.nroPoliza,
        NRORENOVACION: row.nroRenovacion,
        TIPO: row.tipo,
        VALORANTERIOR: row.valorAnterior,
        VALORNUEVO: row.valorNuevo
    }));
    this._excelService.exportAsExcelFileAsync(formattedData, 'Polizas').subscribe({
      next: (blob) => {
        // enviar path polizasBatch/historial/
        // enviar el filename `HISTORIAL_${nameHistory}.xlsx`
        // enviar el blob
        // enviar el metadata
        // mensaje 
        this.showWarning('Funcionalidad en desarrollo.'); 
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar el archivo Excel de pólizas',
        });
      }
    })
  }

  private processPolizasToView(polizas: StorageResponse[]): PolizaViewRow[] {
    return polizas.flatMap((p: StorageResponse) => {
      const nroRenovacion = Number(p.excel['NRO RENOVACION']);
      const nroPoliza = p.excel['NRO POLIZA'];
      return p.antes.flatMap((cambio: AntesData) => {
        // Regra 1: Ignorar tipos especificos
        if (['SIN_CAMBIOS', 'ELIMINACION'].includes(cambio.tipo)) return [];
        // Regra 2: Mapear campos iniciales (Diferencias generales sin sub-items)
        const isInitialInsertion = cambio.tipo === 'INSERCION' && nroRenovacion === 0;
        if (isInitialInsertion || !cambio.data?.length) {
          return [this.createViewRow(nroPoliza, nroRenovacion, cambio.tipo)];
        }
        // Regra 3: Mapear sub-itens (Diferencias específicas por campo)
        return cambio.data
          .filter((sub: CambioData) => sub.visible !== false) // Filtrar campos que no sean visibles
          .map((sub: CambioData) => this.createViewRow(nroPoliza, nroRenovacion, cambio.tipo, sub));
      });
    });
  }
  
  private createViewRow(
    nroPoliza: string,
    nroRenovacion: string | number,
    tipo: string,
    subItem?: CambioData,
  ): PolizaViewRow {
    return {
      nroPoliza,
      nroRenovacion,
      tipo,
      campo: subItem?.campo ?? '',
      valorAnterior: subItem ? (subItem.valor ?? subItem.valorAnterior) : '',
      valorNuevo: subItem?.valorNuevo ?? '',
    };
  }


  /**
   * 
   * @param message 
   */
  public async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.showWarning('No se seleccionó ningún archivo.');
      return;
    }
    // limpiar la tabla y el query param para cargar un nuevo historial
    this.history_polizas.set([]);
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { name_history: null, cache: null },
      queryParamsHandling: 'merge',
    });
    const datosExcel = await this._excelService.excelToJson<any>(file);
    console.log("datos de excel", datosExcel);
  }

  private showWarning(message: string): void {
    this._messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: message,
    });
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { Popover, PopoverModule } from 'primeng/popover';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { finalize } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { BatchHistoryItem, ExcelData } from '../../../../core/interfaces/interface-storage';
import { BucketService } from '../../../../core/services/bucket-service/bucket-service';
import { COLUMNS_STORAGE_TABLE } from '../constants/poliza-constants';

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
    RippleModule,
    ToastModule,
    MenuModule,
    Tooltip,
    Popover,
    SkeletonModule,
  ],
  templateUrl: './poliza.html',
  styleUrl: './poliza.css',
  providers: [MessageService, PopoverModule],
})
export class Poliza implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private bucketService = inject(BucketService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  constructor(private cdr: ChangeDetectorRef) {}

  history_polizas = signal<ExcelData[]>([]);
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  cols: Column[] = COLUMNS_STORAGE_TABLE;
  selectedColumns: Column[] = COLUMNS_STORAGE_TABLE;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const cache = params['cache'];
      const nameHistory = params['name_history'];
      this.loadDataFromBucket(nameHistory, Boolean(cache));
    });
  }

  onColumnChange(selected: Column[]) {
    this.selectedColumns = this.cols.filter((col) => selected.some((v) => v.field === col.field));
  }

  loadDataFromBucket(name: string, cache?: boolean) {
    this.loading = true;
    this.bucketService.getImportBatchDetail(name, cache).subscribe({
      next: (data: ExcelData[]) => {
        this.history_polizas.set(data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      },
    });
  }

  importBatchHistory: BatchHistoryItem[] = [];
  loadingHistory = signal<boolean>(false);

  public onHistoryClick(event: Event, popover: Popover) {
    popover.toggle(event);
    if (!popover.overlayVisible) return;
    this.loadHistory();
  }

  private loadHistory() {
    this.loadingHistory.set(true);
    this.bucketService
      .getImportBatchHistory()
      .pipe(finalize(() => this.loadingHistory.set(false)))
      .subscribe({
        next: (data) => (this.importBatchHistory = data),
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ups, ocurrió un error al cargar el historial.',
          });
        },
      });
  }

  // signal para almacenar el historial seleccionado y mostrarlo en el componente de detalle
  importBatchHistorySignal = signal<BatchHistoryItem | null>(null);
  public loadBatchDetail(batch: BatchHistoryItem) {
    this.importBatchHistorySignal.set(batch);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        cache: 'true',
        name_history: encodeURIComponent(batch.id),
      },
      queryParamsHandling: 'merge',
    });
  }

  public exportExcel(items: any[]) {
    if (!items || items.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'No hay datos para exportar',
      });
      return;
    }

    // 1. Transformamos los datos técnicos a formato de "Usuario"
    const dataToExport = items.map((item) => ({
      TIPODOC: item.TIPODOC, // Asume que estas son tus keys en ExcelData
      DOCUMENTO: item.DOCUMENTO,
      ASEGURADO: item.ASEGURADO,
      CONTRATANTE: item.CONTRATANTE,
      ENDOSATARIO: item.ENDOSATARIO,
      TELEFONO: item.TELEFONO,
      CORREO: item.CORREO,
      'NRO POLIZA': item['NRO POLIZA'],
      'ESTADO RENOVACION': item['ESTADO RENOVACION'],
      'ESTADO EMISION': item['ESTADO EMISION'],
      'SUB ESTADO': item['SUB ESTADO'],
      'NRO RENOVACION': item['NRO RENOVACION'],
      'NRO VEHICULO': item['NRO VEHICULO'],
      USUARIO: item['USUARIO'],
      'FECHA INICIO DE VIG': item['FECHA INICIO DE VIG'],
      'FECHA FIN DE VIG': item['FECHA FIN DE VIG'],
      'CIA SEGUROS': item['CIA SEGUROS'],
      PRODUCTO: item['PRODUCTO'],
      'GPS OBLIGATORIO': item['GPS OBLIGATORIO'] ? 'SÍ' : 'NO',
      COBERTURA: item['COBERTURA'],
      USO: item['USO'],
      CLASE: item['CLASE'],
      'TIENE GPS': item['TIENE GPS'] ? 'SÍ' : 'NO',
      MARCA: item['MARCA'],
      MODELO: item['MODELO'],
      ANIO: item['ANIO'],
      PLACA: item['PLACA'],
      TIMON: item['TIMON'],
      COLOR: item['COLOR'],
      'NRO MOTOR': item['NRO MOTOR'],
      'NRO CHASIS': item['NRO CHASIS'],
      'SUM ASEG': item['SUM ASEG'],
      'TIPO MONEDA': item['TIPO MONEDA'],
      'PRIMA NETA': item['PRIMA NETA'],
      TASA: item['TASA'],
    }));

    try {
      // 2. Generamos el nombre del archivo limpiando caracteres extraños
      const cleanName = `Reporte_Polizas_${new Date().toISOString().slice(0, 10)}.xlsx`;

      // 3. Enviamos al servicio que creamos antes
      this.bucketService.exportToExcel(dataToExport, cleanName);

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: `Excel "${cleanName}" generado con ${items.length} filas`,
      });
    } catch (error) {
      console.error('Error exportando Excel', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo generar el archivo Excel',
      });
    }
  }

  public viewOriginalExcel() {
    // obtener el nombre del archivo original desde el primer item de history_polizas
    const firstItem = this.importBatchHistorySignal();
    // abrir en otro navegador la ruta /polizasBatch/excel/{fileName}
    window.open(
      environment.gcsBucketUrl +
        "https://storage.googleapis.com/gerenciariesgos-1-bucket" +
        `/polizasBatch/excel/${firstItem?.fileName || ''}`,
      '_blank',
    );

    // this.router.navigate(['../polizasBatch/excel/' + firstItem?.fileName], { relativeTo: this.activatedRoute });
    // /polizasBatch/excel/PRUEBA_2026-02-12 14:45:59
  }

}

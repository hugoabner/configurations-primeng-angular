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
  private _activatedRoute = inject(ActivatedRoute);
  private _bucketService = inject(BucketService);
  private _messageService = inject(MessageService);
  private _router = inject(Router);

  constructor(private cdr: ChangeDetectorRef) {}

  history_polizas = signal<ExcelData[]>([]);
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  cols: Column[] = COLUMNS_STORAGE_TABLE;
  selectedColumns: Column[] = COLUMNS_STORAGE_TABLE;
  documentOptions: any[] = [];
  value1: any;
  ngOnInit() {
    this.documentOptions = [
      { name: 'DNI', value: 'DNI' },
      { name: 'RUC', value: 'RUC' },
      { name: 'RUC17', value: 'RUC17' },
      { name: 'RUC10', value: 'RUC10' },
      { name: 'RUC11', value: 'RUC11' },
      { name: 'RUC12', value: 'RUC12' },
      { name: 'RUC13', value: 'RUC13' },
      { name: 'RUC14', value: 'RUC14' },
      { name: 'RUC20', value: 'RUC20' },
      { name: 'CEX', value: 'CEX' },
      { name: 'RUC15', value: 'RUC15' },
      { name: 'PASAP', value: 'PASAP' },
    ];
    this._activatedRoute.queryParams.subscribe((params) => {
      const cache = params['cache'];
      const nameHistory = params['name_history'];
      // si no existe name_history no hacemos nada, porque no sabemos qué historial cargar
      if (!nameHistory) {
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
      next: (data: ExcelData[]) => {
        this.history_polizas.set(data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
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
    this._bucketService
      .getImportBatchHistory()
      .pipe(finalize(() => this.loadingHistory.set(false)))
      .subscribe({
        next: (data) => (this.importBatchHistory = data),
        error: (err) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ups, ocurrió un error al cargar el historial.',
          });
        },
      });
  }

  public loadBatchDetail(batch: BatchHistoryItem) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        cache: 'true',
        name_history: encodeURIComponent(batch.id),
      },
      queryParamsHandling: 'merge',
    });
  }

  public exportExcel(items: any[]) {
    if (!items || items.length === 0) {
      this._messageService.add({
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
      this._bucketService.exportToExcel(dataToExport, cleanName);
      this._messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: `Excel "${cleanName}" generado con ${items.length} filas`,
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
}

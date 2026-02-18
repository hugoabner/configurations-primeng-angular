import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { ExcelData } from '../../../../core/interfaces/interface-storage';
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
    Tooltip,
  ],
  templateUrl: './poliza.html',
  styleUrl: './poliza.css',
  providers: [MessageService],
})
export class Poliza implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private bucketService = inject(BucketService);
  private messageService = inject(MessageService);

  constructor(private cdr: ChangeDetectorRef) {}

  history_polizas!: ExcelData[];
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  cols: Column[] = COLUMNS_STORAGE_TABLE;
  selectedColumns: Column[] = COLUMNS_STORAGE_TABLE;

  ngOnInit() {
    // this.cols = COLUMNS_STORAGE_TABLE;
    // this.selectedColumns = [...this.cols]; // Inicialización con todas las columnas
    this.activatedRoute.queryParams.subscribe((params) => {
      const cache = params['cache'];
      const nameHistory = params['name_history'];
      this.loadDataFromBucket(nameHistory, Boolean(cache));
    });
    
  }
  onColumnChange(selected: Column[]) {
    // Ordena las columnas seleccionadas según el orden original de 'cols'
    this.selectedColumns = this.cols.filter((col) => selected.some((v) => v.field === col.field));
  }


  loadDataFromBucket(name: string, cache?: boolean) {
    this.loading = true;
    this.bucketService.getBatchPolizas(name, cache).subscribe({
      next: (data: ExcelData[]) => {
        this.history_polizas = data;
        this.loading = false;
        this.cdr.detectChanges(); // Detectar cambios después de actualizar los datos
      },
      error: (err) => {
        console.log(JSON.stringify(err, null, 2));
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        // Mostrar notificación de error (Toast)
      }
    });
  }
}

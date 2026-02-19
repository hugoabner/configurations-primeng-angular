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
            detail: "Ups, ocurrió un error al cargar el historial.",
          });
        },
      });
  }

  public loadBatchDetail(batch: BatchHistoryItem) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        cache: 'true',
        name_history: encodeURIComponent(batch.id),
      },
      queryParamsHandling: 'merge',
    });
  }
}

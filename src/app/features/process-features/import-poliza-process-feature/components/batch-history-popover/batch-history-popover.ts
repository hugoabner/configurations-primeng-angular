import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, ViewChild } from '@angular/core';
import { Button } from "primeng/button";
import { Popover, PopoverModule } from "primeng/popover";
import { SkeletonModule } from 'primeng/skeleton';
import { BatchHistoryItem } from '../../../../../core/interfaces/interface-storage';

@Component({
  selector: 'app-batch-history-popover',
  imports: [PopoverModule, SkeletonModule, CommonModule, Button],
  templateUrl: './batch-history-popover.html',
  styleUrl: './batch-history-popover.css',
  // Sin OnPush: cada cambio en el padre → re-renderiza el hijo (desperdicio)
  // Con OnPush: solo cambios relevantes → re-renderiza el hijo (eficiente)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BatchHistoryPopover {

  readonly loading = input<boolean>(false);
  readonly importBatchHistory = input<readonly BatchHistoryItem[]>([]);

  readonly requestHistory = output<void>();
  readonly batchSelected = output<BatchHistoryItem>();

  @ViewChild('op') private op!: Popover;

  public onHistoryClick(event: Event) {
    this.op.toggle(event);
    if (this.op.overlayVisible) {
      this.requestHistory.emit();
    }
  }

  public onBatchClick(batch: BatchHistoryItem): void {
    this.batchSelected.emit(batch);
  }
}

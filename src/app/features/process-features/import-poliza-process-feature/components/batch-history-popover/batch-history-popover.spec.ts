import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHistoryPopover } from './batch-history-popover';

describe('BatchHistoryPopover', () => {
  let component: BatchHistoryPopover;
  let fixture: ComponentFixture<BatchHistoryPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchHistoryPopover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchHistoryPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTriggerMain } from './sidebar-trigger-main';

describe('SidebarTriggerMain', () => {
  let component: SidebarTriggerMain;
  let fixture: ComponentFixture<SidebarTriggerMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTriggerMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarTriggerMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

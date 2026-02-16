import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSubmenu } from './sidebar-submenu';

describe('SidebarSubmenu', () => {
  let component: SidebarSubmenu;
  let fixture: ComponentFixture<SidebarSubmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSubmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSubmenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

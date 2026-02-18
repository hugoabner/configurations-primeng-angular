import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poliza } from './poliza';

describe('Poliza', () => {
  let component: Poliza;
  let fixture: ComponentFixture<Poliza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poliza]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Poliza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasYFacturacionComponent } from './estadisticas-y-facturacion.component';

describe('EstadisticasYFacturacionComponent', () => {
  let component: EstadisticasYFacturacionComponent;
  let fixture: ComponentFixture<EstadisticasYFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasYFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasYFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

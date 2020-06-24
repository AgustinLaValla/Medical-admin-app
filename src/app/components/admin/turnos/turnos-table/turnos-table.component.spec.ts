import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosTableComponent } from './turnos-table.component';

describe('TurnosTableComponent', () => {
  let component: TurnosTableComponent;
  let fixture: ComponentFixture<TurnosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosDialogComponent } from './turnos-dialog.component';

describe('TurnosDialogComponent', () => {
  let component: TurnosDialogComponent;
  let fixture: ComponentFixture<TurnosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

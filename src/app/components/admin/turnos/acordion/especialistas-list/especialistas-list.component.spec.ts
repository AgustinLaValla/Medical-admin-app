import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasListComponent } from './especialistas-list.component';

describe('EspecialistasListComponent', () => {
  let component: EspecialistasListComponent;
  let fixture: ComponentFixture<EspecialistasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialistasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

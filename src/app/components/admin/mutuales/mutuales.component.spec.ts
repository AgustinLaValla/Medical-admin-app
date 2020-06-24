import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualesComponent } from './mutuales.component';

describe('MutualesComponent', () => {
  let component: MutualesComponent;
  let fixture: ComponentFixture<MutualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

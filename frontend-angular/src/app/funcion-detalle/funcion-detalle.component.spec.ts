import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionDetalleComponent } from './funcion-detalle.component';

describe('FuncionDetalleComponent', () => {
  let component: FuncionDetalleComponent;
  let fixture: ComponentFixture<FuncionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

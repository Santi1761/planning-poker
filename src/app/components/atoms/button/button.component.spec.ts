import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar el texto correctamente', () => {
    fixture.componentRef.setInput('text', 'Prueba');
    fixture.detectChanges();
    expect(component.text).toBe('Prueba');
  });

  it('debería inicializar como habilitado por defecto', () => {
    expect(component.disabled).toBeFalsy();
  });
});

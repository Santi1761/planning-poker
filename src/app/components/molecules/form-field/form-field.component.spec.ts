import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { FormControl, Validators } from '@angular/forms';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
  });

  it('debería retornar error "required" cuando el campo está vacío', () => {
    component.control = new FormControl('', Validators.required);
    component.control.markAsTouched();
    expect(component.errorMessage).toBe('Este campo es obligatorio.');
  });

  it('debería retornar error de "invalidCharacters" según las reglas de negocio', () => {
    component.control = new FormControl('');
    component.control.setErrors({ invalidCharacters: true });
    expect(component.errorMessage).toBe('No se permiten caracteres especiales (_,.*#/-).');
  });
});

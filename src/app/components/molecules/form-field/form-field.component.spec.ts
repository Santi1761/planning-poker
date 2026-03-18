import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { FormControl } from '@angular/forms';

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

  it('debería retornar los mensajes de error correspondientes', () => {
    component.control = new FormControl('');

    component.control.setErrors({ required: true });
    expect(component.errorMessage).toBe('Este campo es obligatorio.');

    component.control.setErrors({ minlength: true });
    expect(component.errorMessage).toBe('Debe tener al menos 5 caracteres.');

    component.control.setErrors({ maxlength: true });
    expect(component.errorMessage).toBe('No puede exceder los 20 caracteres.');

    component.control.setErrors({ invalidCharacters: true });
    expect(component.errorMessage).toBe('No se permiten caracteres especiales (_,.*#/-).');

    component.control.setErrors({ tooManyNumbers: true });
    expect(component.errorMessage).toBe('Máximo se permiten 3 números.');

    component.control.setErrors({ onlyNumbers: true });
    expect(component.errorMessage).toBe('El nombre no puede contener solo números.');

    component.control.setErrors(null);
    expect(component.errorMessage).toBe('');
  });
});

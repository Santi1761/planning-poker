import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';
import { FormControl } from '@angular/forms';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('jugador');
    component.value = 'espectador';
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cambiar el valor del control al ejecutar onSelect', () => {
    component.onSelect();
    expect(component.control.value).toBe('espectador');
  });

  it('no debería cambiar el valor si ya está seleccionado', () => {
    component.control.setValue('espectador');
    component.value = 'espectador';
    jest.spyOn(component.control, 'setValue');

    component.onSelect();

    expect(component.control.setValue).not.toHaveBeenCalled();
  });
});

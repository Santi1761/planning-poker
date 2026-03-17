import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGameFormComponent } from './create-game-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateGameFormComponent', () => {
  let component: CreateGameFormComponent;
  let fixture: ComponentFixture<CreateGameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGameFormComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario como inválido', () => {
    expect(component.gameForm.invalid).toBeTruthy();
  });

  it('debería emitir el nombre de la partida si el formulario es válido al enviar', () => {
    jest.spyOn(component.formSubmit, 'emit');
    component.gameNameControl.setValue('Sprint 32');
    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith('Sprint 32');
    expect(component.isLoading).toBeTruthy();
  });

  it('NO debería emitir nada si el formulario es inválido', () => {
    jest.spyOn(component.formSubmit, 'emit');
    component.gameNameControl.setValue('abc');

    component.onSubmit();
    expect(component.formSubmit.emit).not.toHaveBeenCalled();
    expect(component.gameNameControl.touched).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserFormComponent } from './create-user-form.component';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el formulario', () => {
    expect(component).toBeTruthy();
  });

  it('debería ser inválido si el nombre está vacío', () => {
    component.userNameControl.setValue('');
    expect(component.userForm.invalid).toBeTruthy();
  });

  it('debería emitir el evento al enviar un formulario válido', () => {
    jest.spyOn(component.formSubmit, 'emit');

    component.userNameControl.setValue('Pragma123');
    component.viewModeControl.setValue('espectador');

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      userName: 'Pragma123',
      viewMode: 'espectador'
    });
    expect(component.isLoading).toBeTruthy();
  });
});

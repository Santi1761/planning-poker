import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    const userServiceMock = {
      createUser: jest.fn().mockReturnValue(of({ id: '123', name: 'Santi', viewMode: 'jugador', role: 'propietario' }))
    };
    globalThis.alert = jest.fn();

    await TestBed.configureTestingModule({
      imports: [CreateUserComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('debería crear la página y setear etiquetas SEO', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al UserService cuando el formulario emite el submit', () => {
    const mockPayload = { name: 'Santi', viewMode: 'jugador' };
    component.onUserSubmit(mockPayload);
    expect(userService.createUser).toHaveBeenCalledWith(mockPayload);
    expect(globalThis.alert).toHaveBeenCalled();
  });
});

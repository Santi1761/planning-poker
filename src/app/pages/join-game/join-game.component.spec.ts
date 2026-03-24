import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinGameComponent } from './join-game.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';

describe('JoinGameComponent', () => {
  let component: JoinGameComponent;
  let fixture: ComponentFixture<JoinGameComponent>;
  let routerMock: any;
  let userServiceMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jest.fn() };
    userServiceMock = { joinGame: jest.fn().mockReturnValue(of({ name: 'Jorge', role: 'jugador' })) };

    await TestBed.configureTestingModule({

      imports: [JoinGameComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'TEST-123' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente y capturar el ID de la ruta', () => {
    expect(component).toBeTruthy();
    expect(component.gameId).toBe('TEST-123');
  });

  it('debería llamar a joinGame y navegar al tablero al hacer submit del formulario', () => {
    component.onUserSubmit({ name: 'Jorge', viewMode: 'jugador' });
    expect(userServiceMock.joinGame).toHaveBeenCalledWith({ name: 'Jorge', viewMode: 'jugador' }, 'TEST-123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/board']);
  });

  it('debería manejar error en consola si el servicio de unirse falla', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    userServiceMock.joinGame.mockReturnValue(throwError(() => new Error('Error de red')));

    component.onUserSubmit({ name: 'Jorge', viewMode: 'jugador' });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('JoinGameComponent - Sin ID en URL', () => {
  it('debería redirigir al inicio si no hay ID en la ruta', async () => {
    const routerMock = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [JoinGameComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(JoinGameComponent);
    fixture.detectChanges();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});

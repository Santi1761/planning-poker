import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar el usuario con el rol propietario simulando el backend', (done) => {
    const mockUser = { name: 'Santiago', viewMode: 'jugador' };

    service.createUser(mockUser).subscribe(response => {
      expect(response.name).toBe('Santiago');
      expect(response.viewMode).toBe('jugador');
      expect(response.role).toBe('propietario');
      expect(response.id).toBeDefined();
    });
  });
});

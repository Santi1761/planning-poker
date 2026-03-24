import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { StoragePort } from '../core/ports/storage.port';

describe('UserService', () => {
  let service: UserService;
  let storageMock: any;

  beforeEach(() => {
    storageMock = {
      saveUser: jest.fn(),
      saveGameId: jest.fn(),
      saveGameName: jest.fn(),
      getGameName: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: StoragePort, useValue: storageMock }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('debería simular la creación de usuario', (done) => {
    const payload = { name: 'Santi', viewMode: 'espectador' };

    service.createUser(payload).subscribe(response => {
      expect(response.name).toBe('Santi');
      expect(storageMock.saveUser).toHaveBeenCalledWith('Santi', 'propietario', 'espectador');
      done();
    });
  });

  it('debería unirse al juego como jugador y guardar nombre por defecto si no existe', (done) => {
    const payload = { name: 'Jorge', viewMode: 'jugador' };
    storageMock.getGameName.mockReturnValue(null);

    service.joinGame(payload, 'ID-123').subscribe(response => {
      expect(response.role).toBe('jugador');
      expect(storageMock.saveGameId).toHaveBeenCalledWith('ID-123');
      expect(storageMock.saveGameName).toHaveBeenCalledWith('Partida Invitado');
      expect(storageMock.saveUser).toHaveBeenCalledWith('Jorge', 'jugador', 'jugador');
      done();
    });
  });

  it('debería unirse al juego y no sobreescribir el nombre si ya existe', (done) => {
    const payload = { name: 'Jorge', viewMode: 'jugador' };
    storageMock.getGameName.mockReturnValue('Sprint 32');

    service.joinGame(payload, 'ID-123').subscribe(response => {
      expect(storageMock.saveGameName).not.toHaveBeenCalled();
      done();
    });
  });
});

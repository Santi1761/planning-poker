import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { StoragePort } from '../core/ports/storage.port';

describe('UserService', () => {
  let service: UserService;
  let storageMock: any;

  beforeEach(() => {
    storageMock = { saveUser: jest.fn() };

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
});

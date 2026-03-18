import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { StoragePort } from '../core/ports/storage.port';

describe('GameService', () => {
  let service: GameService;
  let storageMock: any;

  beforeEach(() => {
    storageMock = { saveGameName: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: StoragePort, useValue: storageMock }
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('debería simular la creación de la partida', (done) => {
    service.createGame('Pragma Game').subscribe(response => {
      expect(response.name).toBe('Pragma Game');
      expect(storageMock.saveGameName).toHaveBeenCalledWith('Pragma Game');
      done();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar un observable con el nombre de la partida y un ID mockeado', (done) => {
    const testName = 'Sprint 32';

    service.createGame(testName).subscribe(response => {
      expect(response.name).toBe(testName);
      expect(response.id).toBe('9QdP98VGUrZQLNCqYAF7');
      done();
    });
  });
});

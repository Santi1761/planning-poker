import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoardComponent } from './game-board.component';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StoragePort } from '../../core/ports/storage.port';
import { CardPort } from '../../core/ports/card.port';
import { of } from 'rxjs';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let router: Router;
  let storagePort: StoragePort;

  beforeEach(async () => {
    const titleMock = { setTitle: jest.fn() };
    const metaMock = { updateTag: jest.fn() };
    const routerMock = { navigate: jest.fn() };
    const storageMock = {
      getGameName: jest.fn(),
      getUser: jest.fn()
    };
    const cardPortMock = {
      getCards: jest.fn().mockReturnValue(of(['1', '3', '5']))
    };

    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [
        { provide: Title, useValue: titleMock },
        { provide: Meta, useValue: metaMock },
        { provide: Router, useValue: routerMock },
        { provide: StoragePort, useValue: storageMock },
        { provide: CardPort, useValue: cardPortMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storagePort = TestBed.inject(StoragePort);
  });

  it('debería redirigir al inicio si no hay datos en el storage', () => {
    jest.spyOn(storagePort, 'getGameName').mockReturnValue(null);
    jest.spyOn(storagePort, 'getUser').mockReturnValue(null);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('debería cargar la mesa si existen los datos en el storage', () => {
    jest.spyOn(storagePort, 'getGameName').mockReturnValue('Sprint Test');
    jest.spyOn(storagePort, 'getUser').mockReturnValue({ name: 'Luisa', role: 'propietario', viewMode: 'jugador' });
    fixture.detectChanges();
    expect(component.gameName).toBe('Sprint Test');
    expect(component.userInitials).toBe('LU');
    expect(component.mockPlayers.length).toBeGreaterThan(0);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debería voltear la carta del usuario en la mesa al ejecutar onCardSelected (AC5)', () => {
    jest.spyOn(storagePort, 'getGameName').mockReturnValue('Sprint 32');
    jest.spyOn(storagePort, 'getUser').mockReturnValue({ name: 'Luisa', role: 'propietario', viewMode: 'jugador' });
    fixture.detectChanges();

    component.onCardSelected('21');
    expect(component.mockPlayers[4].hasVoted).toBeTruthy();
  });
});

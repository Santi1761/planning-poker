import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGameComponent } from './create-game.component';
import { Title, Meta } from '@angular/platform-browser';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;
  let titleService: Title;
  let metaService: Meta;
  let gameService: GameService;

  beforeEach(async () => {
    globalThis.alert = jest.fn();

    const titleMock = { setTitle: jest.fn() };
    const metaMock = { updateTag: jest.fn() };
    const gameServiceMock = { createGame: jest.fn().mockReturnValue(of({ id: '123', name: 'Test' })) };

    await TestBed.configureTestingModule({
      imports: [CreateGameComponent],
      providers: [
        { provide: Title, useValue: titleMock },
        { provide: Meta, useValue: metaMock },
        { provide: GameService, useValue: gameServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    gameService = TestBed.inject(GameService);

    fixture.detectChanges();
  });

  it('debería configurar las etiquetas SEO al iniciar (ngOnInit)', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('Crear Partida | Pragma Planning Poker');
    expect(metaService.updateTag).toHaveBeenCalled();
  });

  it('debería llamar al servicio GameService al ejecutar onGameCreated', () => {
    component.onGameCreated('Nueva Partida Test');
    expect(gameService.createGame).toHaveBeenCalledWith('Nueva Partida Test');
    expect(globalThis.alert).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { CardPort } from '../core/ports/card.port';
import { of } from 'rxjs';

describe('CardService', () => {
  let service: CardService;
  let cardPortMock: any;

  beforeEach(() => {
    cardPortMock = {
      getCards: jest.fn().mockReturnValue(of(['1', '3', '5']))
    };

    TestBed.configureTestingModule({
      providers: [
        CardService,
        { provide: CardPort, useValue: cardPortMock }
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('debería llamar al puerto para obtener las cartas', (done) => {
    service.getAvailableCards().subscribe(cards => {
      expect(cards).toEqual(['1', '3', '5']);
      expect(cardPortMock.getCards).toHaveBeenCalled();
      done();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDeckComponent } from './card-deck.component';
import { CardService } from '../../../services/card.service';
import { of, throwError } from 'rxjs';

describe('CardDeckComponent', () => {
  let component: CardDeckComponent;
  let fixture: ComponentFixture<CardDeckComponent>;
  let cardServiceMock: any;

  beforeEach(async () => {
    cardServiceMock = {
      getAvailableCards: jest.fn().mockReturnValue(of(['1', '2', '3']))
    };

    await TestBed.configureTestingModule({
      imports: [CardDeckComponent],
      providers: [
        { provide: CardService, useValue: cardServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDeckComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar las cartas exitosamente al iniciar', () => {
    fixture.detectChanges();
    expect(component.cards).toEqual(['1', '2', '3']);
    expect(component.isLoading).toBeFalsy();
  });

  it('debería mostrar lista vacía si el servicio falla', () => {
    cardServiceMock.getAvailableCards.mockReturnValue(throwError(() => new Error('Error de red')));
    fixture.detectChanges();

    expect(component.cards.length).toBe(0);
    expect(component.isLoading).toBeFalsy();
  });

  it('debería emitir el evento al seleccionar una carta', () => {
    fixture.detectChanges();
    jest.spyOn(component.cardSelected, 'emit');

    component.onSelect('8');

    expect(component.selectedCard).toBe('8');
    expect(component.cardSelected.emit).toHaveBeenCalledWith('8');
  });
});

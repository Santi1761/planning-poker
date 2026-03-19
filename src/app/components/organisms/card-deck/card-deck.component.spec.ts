import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeck } from './card-deck.component';

describe('CardDeck', () => {
  let component: CardDeck;
  let fixture: ComponentFixture<CardDeck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDeck],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDeck);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { MockCardAdapter } from './mock-card.adapter';

describe('MockCardAdapter', () => {
  let adapter: MockCardAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockCardAdapter]
    });
    adapter = TestBed.inject(MockCardAdapter);
  });

  it('debería retornar el arreglo de cartas de Planning Poker', (done) => {
    adapter.getCards().subscribe(cards => {
      expect(cards.length).toBeGreaterThan(0);
      expect(cards).toContain('21');
      expect(cards).toContain('?');
      done();
    });
  });
});

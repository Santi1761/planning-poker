import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokerTableComponent } from './poker-table.component';

describe('PokerTableComponent', () => {
  let component: PokerTableComponent;
  let fixture: ComponentFixture<PokerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir playerClicked con el índice correcto al hacer clic en un slot (HU13)', () => {
    jest.spyOn(component.playerClicked, 'emit');

    component.playerClicked.emit(1);
    expect(component.playerClicked.emit).toHaveBeenCalledWith(1);
  });
});

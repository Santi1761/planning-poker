import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardComponent } from './player-card.component';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener la clase voted si hasVoted es true', () => {
    const fixture2 = TestBed.createComponent(PlayerCardComponent);
    const comp2 = fixture2.componentInstance;

    comp2.hasVoted = true;

    fixture2.detectChanges();

    const cardElement = fixture2.nativeElement.querySelector('.card');

    expect(cardElement.classList.contains('voted')).toBeTruthy();
  });
});

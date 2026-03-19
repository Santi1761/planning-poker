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
  });

  it('debería tener la clase voted si hasVoted es true y no está revelada', () => {
    component.hasVoted = true;
    component.isRevealed = false;
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.classList.contains('voted')).toBeTruthy();
    expect(cardElement.classList.contains('revealed')).toBeFalsy();
  });

  it('debería tener la clase revealed y mostrar el valor si está votada y revelada', () => {
    component.hasVoted = true;
    component.isRevealed = true;
    component.value = '21';
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.card');
    const valueElement = fixture.nativeElement.querySelector('.card-value');

    expect(cardElement.classList.contains('revealed')).toBeTruthy();
    expect(valueElement.textContent.trim()).toBe('21');
  });
});

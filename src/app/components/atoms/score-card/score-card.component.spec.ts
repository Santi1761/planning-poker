import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreCardComponent } from './score-card.component';

describe('ScoreCardComponent', () => {
  let component: ScoreCardComponent;
  let fixture: ComponentFixture<ScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreCardComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar el valor de la carta', () => {
    component.value = '55';
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('.score-card');
    expect(cardElement.textContent.trim()).toBe('55');
  });

  it('debería tener la clase selected si isSelected es true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('.score-card');
    expect(cardElement.classList.contains('selected')).toBeTruthy();
  });
});

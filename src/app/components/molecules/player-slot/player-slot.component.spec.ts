import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerSlotComponent } from './player-slot.component';

describe('PlayerSlotComponent', () => {
  let component: PlayerSlotComponent;
  let fixture: ComponentFixture<PlayerSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSlotComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSlotComponent);
    component = fixture.componentInstance;
  });

  it('debería renderizar el nombre del jugador', () => {
    component.player = { name: 'Santiago', type: 'jugador', hasVoted: false, initials: '' };
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.player-name');
    expect(nameElement.textContent).toContain('Santiago');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoteSummaryComponent } from './vote-summary.component';
import { PlayerInfo } from '../../molecules/player-slot/player-slot.component';

describe('VoteSummaryComponent', () => {
  let component: VoteSummaryComponent;
  let fixture: ComponentFixture<VoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteSummaryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VoteSummaryComponent);
    component = fixture.componentInstance;
  });

  it('debería calcular el promedio correctamente y agrupar los votos ignorando espectadores y no numéricos', () => {
    const mockPlayers: PlayerInfo[] = [
      { name: 'P1', type: 'jugador', hasVoted: true, initials: 'P1', voteValue: '3' },
      { name: 'P2', type: 'jugador', hasVoted: true, initials: 'P2', voteValue: '5' },
      { name: 'P3', type: 'jugador', hasVoted: true, initials: 'P3', voteValue: '5' },
      { name: 'P4', type: 'jugador', hasVoted: true, initials: 'P4', voteValue: '?' },
      { name: 'P5', type: 'espectador', hasVoted: true, initials: 'P5', voteValue: '100' }
    ];

    component.players = mockPlayers;
    component.ngOnChanges();

    expect(component.average).toBe('4,3');
    expect(component.voteCounts.length).toBe(3);
    expect(component.voteCounts.find(v => v.value === '5')?.count).toBe(2);
  });
});

import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerInfo } from '../../molecules/player-slot/player-slot.component';
import { ScoreCardComponent } from '../../atoms/score-card/score-card.component';

@Component({
  selector: 'app-vote-summary',
  standalone: true,
  imports: [CommonModule, ScoreCardComponent],
  templateUrl: './vote-summary.component.html',
  styleUrl: './vote-summary.component.scss'
})
export class VoteSummaryComponent implements OnChanges {
  @Input() players: PlayerInfo[] = [];

  voteCounts: { value: string; count: number }[] = [];
  average: string = '0';

  ngOnChanges(): void {
    this.calculateSummary();
  }

  calculateSummary() {
    const validVotes = this.players.filter(p => p.type === 'jugador' && p.hasVoted && p.voteValue);
    const counts: { [key: string]: number } = {};
    validVotes.forEach(p => {
      counts[p.voteValue!] = (counts[p.voteValue!] || 0) + 1;
    });

    this.voteCounts = Object.keys(counts).map(key => ({ value: key, count: counts[key] }));

    let sum = 0;
    let numericVotesCount = 0;

    validVotes.forEach(p => {
      const num = Number(p.voteValue);
      if (!Number.isNaN(num)) {
        sum += num;
        numericVotesCount++;
      }
    });

    const avgCalc = numericVotesCount > 0 ? (sum / numericVotesCount) : 0;
    this.average = avgCalc.toFixed(1).replace('.', ',');
  }
}

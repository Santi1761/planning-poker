import { Component, computed, input } from '@angular/core';
import { PlayerInfo } from '../../molecules/player-slot/player-slot.component';
import { ScoreCardComponent } from '../../atoms/score-card/score-card.component';

@Component({
  selector: 'app-vote-summary',
  standalone: true,
  imports: [ScoreCardComponent],
  templateUrl: './vote-summary.component.html',
  styleUrl: './vote-summary.component.scss'
})
export class VoteSummaryComponent {
  players = input<PlayerInfo[]>([]);

  voteCounts = computed(() => {
    const validVotes = this.players().filter(p => p.type === 'jugador' && p.hasVoted && p.voteValue);
    const counts: { [key: string]: number } = {};
    validVotes.forEach(p => {
      counts[p.voteValue!] = (counts[p.voteValue!] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ value: key, count: counts[key] }));
  });

  average = computed(() => {
    const validVotes = this.players().filter(p => p.type === 'jugador' && p.hasVoted && p.voteValue);
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
    return avgCalc.toFixed(1).replace('.', ',');
  });
}

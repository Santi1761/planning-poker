import { Component, input, output } from '@angular/core';
import { PlayerCardComponent } from '../../atoms/player-card/player-card.component';
import { SpectatorBadgeComponent } from '../../atoms/spectator-badge/spectator-badge.component';

export interface PlayerInfo {
  name: string;
  type: 'jugador' | 'espectador';
  hasVoted: boolean;
  initials: string;
  voteValue?: string;
  isAdmin?: boolean;
}

@Component({
  selector: 'app-player-slot',
  standalone: true,
  imports: [PlayerCardComponent, SpectatorBadgeComponent],
  templateUrl: './player-slot.component.html',
  styleUrl: './player-slot.component.scss'
})
export class PlayerSlotComponent {
  player = input<PlayerInfo>({ name: '', type: 'jugador', hasVoted: false, initials: '' });
  isRevealed = input<boolean>(false);
  slotClicked = output<void>();
}

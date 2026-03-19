import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../../atoms/player-card/player-card.component';
import { SpectatorBadgeComponent } from '../../atoms/spectator-badge/spectator-badge.component';

export interface PlayerInfo {
  name: string;
  type: 'jugador' | 'espectador';
  hasVoted: boolean;
  initials: string;
  voteValue?: string;
}

@Component({
  selector: 'app-player-slot',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, SpectatorBadgeComponent],
  templateUrl: './player-slot.component.html',
  styleUrl: './player-slot.component.scss'
})
export class PlayerSlotComponent {
  @Input() player: PlayerInfo = {
    name: '',
    type: 'jugador',
    hasVoted: false,
    initials: ''
  };
  @Input() isRevealed: boolean = false;
}

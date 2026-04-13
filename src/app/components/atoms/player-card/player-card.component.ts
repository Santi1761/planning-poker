import { Component, input } from '@angular/core';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent {
  hasVoted = input<boolean>(false);
  isRevealed = input<boolean>(false);
  value = input<string | undefined>(undefined);
}

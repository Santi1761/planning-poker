import { Component, input, output } from '@angular/core';
import { PlayerSlotComponent, PlayerInfo } from '../../molecules/player-slot/player-slot.component';

@Component({
  selector: 'app-poker-table',
  standalone: true,
  imports: [PlayerSlotComponent],
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent {
  players = input<PlayerInfo[]>([]);
  isRevealed = input<boolean>(false);
  playerClicked = output<number>();
}

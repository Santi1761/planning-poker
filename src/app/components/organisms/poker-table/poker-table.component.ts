import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSlotComponent, PlayerInfo } from '../../molecules/player-slot/player-slot.component';

@Component({
  selector: 'app-poker-table',
  standalone: true,
  imports: [CommonModule, PlayerSlotComponent],
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent {
  @Input() players: PlayerInfo[] = [];
  @Input() isRevealed: boolean = false;

  @Output() playerClicked = new EventEmitter<number>();
}

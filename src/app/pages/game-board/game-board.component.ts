import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PokerTableComponent } from '../../components/organisms/poker-table/poker-table.component';
import { PlayerInfo } from '../../components/molecules/player-slot/player-slot.component';
import { StoragePort } from '../../core/ports/storage.port';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, PokerTableComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  gameName: string = '';
  userInitials: string = '';
  mockPlayers: PlayerInfo[] = [];

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly storage: StoragePort,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const savedGameName = this.storage.getGameName();
    const savedUser = this.storage.getUser();

    if (!savedGameName || !savedUser) {
      this.router.navigate(['/']);
      return;
    }

    this.titleService.setTitle(`${savedGameName} | Mesa`);
    this.gameName = savedGameName;
    this.userInitials = savedUser.name.substring(0, 2).toUpperCase();
    this.mockPlayers = [
      { name: 'Oscar', type: 'jugador', hasVoted: false, initials: '' },
      { name: 'David', type: 'espectador', hasVoted: false, initials: 'DA' },
      { name: 'Albert', type: 'jugador', hasVoted: false, initials: '' },
      { name: 'Carlos', type: 'jugador', hasVoted: false, initials: '' },
      {
        name: savedUser.name,
        type: savedUser.viewMode as 'jugador' | 'espectador',
        hasVoted: false,
        initials: this.userInitials
      },
      { name: 'Nata', type: 'jugador', hasVoted: false, initials: '' },
      { name: 'Vale', type: 'jugador', hasVoted: false, initials: '' },
      { name: 'Pedro', type: 'jugador', hasVoted: false, initials: '' }
    ];
  }
}

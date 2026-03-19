import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PokerTableComponent } from '../../components/organisms/poker-table/poker-table.component';
import { CardDeckComponent } from '../../components/organisms/card-deck/card-deck.component';
import { VoteSummaryComponent } from '../../components/organisms/vote-summary/vote-summary.component';
import { PlayerInfo } from '../../components/molecules/player-slot/player-slot.component';
import { StoragePort } from '../../core/ports/storage.port';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, PokerTableComponent, CardDeckComponent, VoteSummaryComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  gameName: string = '';
  userInitials: string = '';
  userViewMode: string = 'jugador';
  userRole: string = 'propietario';
  isRevealed: boolean = false;
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
    this.userViewMode = savedUser.viewMode;
    this.userRole = savedUser.role;

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

  onCardSelected(cardValue: string) {
    this.mockPlayers[4].hasVoted = true;
    this.mockPlayers[4].voteValue = cardValue;
    this.mockPlayers = [...this.mockPlayers];
  }

  revealCards() {
    this.isRevealed = true;

    this.mockPlayers[0].voteValue = '3';  this.mockPlayers[0].hasVoted = true;
    this.mockPlayers[2].voteValue = '13'; this.mockPlayers[2].hasVoted = true;
    this.mockPlayers[3].voteValue = '21'; this.mockPlayers[3].hasVoted = true;
    this.mockPlayers[5].voteValue = '13'; this.mockPlayers[5].hasVoted = true;
    this.mockPlayers[6].voteValue = '5';  this.mockPlayers[6].hasVoted = true;
    this.mockPlayers[7].voteValue = '13'; this.mockPlayers[7].hasVoted = true;
    this.mockPlayers = [...this.mockPlayers];
  }
}

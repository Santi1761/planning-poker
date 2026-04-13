import { Component, OnInit, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PokerTableComponent } from '../../components/organisms/poker-table/poker-table.component';
import { CardDeckComponent } from '../../components/organisms/card-deck/card-deck.component';
import { VoteSummaryComponent } from '../../components/organisms/vote-summary/vote-summary.component';
import { PlayerInfo } from '../../components/molecules/player-slot/player-slot.component';
import { StoragePort } from '../../core/ports/storage.port';
import { InviteModalComponent } from '../../components/organisms/invite-modal/invite-modal.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [PokerTableComponent, CardDeckComponent, VoteSummaryComponent, InviteModalComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  gameName = signal('');
  gameId = signal('');
  userInitials = signal('');
  userViewMode = signal('jugador');
  userRole = signal('propietario');
  isRevealed = signal(false);
  isModalOpen = signal(false);
  mockPlayers = signal<PlayerInfo[]>([]);

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly storage: StoragePort,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const savedGameName = this.storage.getGameName();
    const savedUser = this.storage.getUser();
    const savedGameId = this.storage.getGameId();

    if (!savedGameName || !savedUser || !savedGameId) {
      this.router.navigate(['/']);
      return;
    }

    this.titleService.setTitle(`${savedGameName} | Mesa`);
    this.gameName.set(savedGameName);
    this.gameId.set(savedGameId);
    this.userInitials.set(savedUser.name.substring(0, 2).toUpperCase());
    this.userViewMode.set(savedUser.viewMode);
    this.userRole.set(savedUser.role);

    this.buildMultiplayerTable(savedUser);
  }

  buildMultiplayerTable(savedUser: { name: string, role: string, viewMode: string }) {
    const userSlot: PlayerInfo = {
      name: savedUser.name,
      type: savedUser.viewMode as 'jugador' | 'espectador',
      hasVoted: false,
      initials: this.userInitials()
    };

    if (savedUser.role === 'jugador') {
      this.mockPlayers.set([
        { name: 'Admin (Host)', type: 'jugador', hasVoted: false, initials: 'AD' },
        { name: 'David', type: 'espectador', hasVoted: false, initials: 'DA' },
        { name: 'Albert', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'Carlos', type: 'jugador', hasVoted: false, initials: '' },
        userSlot,
        { name: 'Nata', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'Vale', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'Pedro', type: 'jugador', hasVoted: false, initials: '' }
      ]);
    } else {
      this.mockPlayers.set([
        { name: 'Oscar', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'David', type: 'espectador', hasVoted: false, initials: 'DA' },
        { name: 'Albert', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'Carlos', type: 'jugador', hasVoted: false, initials: '' },
        userSlot,
        { name: 'Nata', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'Vale', type: 'jugador', hasVoted: false, initials: '' },
        { name: 'Invitado', type: 'jugador', hasVoted: false, initials: 'IN' }
      ]);
    }
  }

  onCardSelected(cardValue: string) {
    this.mockPlayers.update(players => {
      const updated = [...players];
      updated[4] = { ...updated[4], hasVoted: true, voteValue: cardValue };
      return updated;
    });
  }

  revealCards() {
    this.isRevealed.set(true);
    this.mockPlayers.update(players => {
      const updated = [...players];
      updated[0] = { ...updated[0], voteValue: '3',  hasVoted: true };
      updated[2] = { ...updated[2], voteValue: '13', hasVoted: true };
      updated[3] = { ...updated[3], voteValue: '21', hasVoted: true };
      updated[5] = { ...updated[5], voteValue: '13', hasVoted: true };
      updated[6] = { ...updated[6], voteValue: '5',  hasVoted: true };
      updated[7] = { ...updated[7], voteValue: '13', hasVoted: true };
      return updated;
    });
  }

  restartGame() {
    this.isRevealed.set(false);
    this.mockPlayers.update(players =>
      players.map(player => ({ ...player, hasVoted: false, voteValue: undefined }))
    );
  }

  toggleViewMode() {
    const newMode = this.userViewMode() === 'jugador' ? 'espectador' : 'jugador';
    this.userViewMode.set(newMode);

    this.mockPlayers.update(players => {
      const updated = [...players];
      updated[4] = { ...updated[4], type: newMode as 'jugador' | 'espectador' };
      if (newMode === 'espectador') {
        updated[4] = { ...updated[4], hasVoted: false, voteValue: undefined };
      }
      return updated;
    });

    const savedUser = this.storage.getUser();
    if (savedUser) {
      this.storage.saveUser(savedUser.name, savedUser.role, newMode);
    }
  }

  openInviteModal() {
    this.isModalOpen.set(true);
  }

  closeInviteModal() {
    this.isModalOpen.set(false);
  }

  makeAdmin(playerIndex: number) {
    if (this.userRole() !== 'propietario') return;
    if (playerIndex === 4) return;

    this.mockPlayers.update(players => {
      const updated = [...players];
      updated[playerIndex] = { ...updated[playerIndex], isAdmin: !updated[playerIndex].isAdmin };
      return updated;
    });
  }
}

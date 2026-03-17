import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { CreateGameFormComponent } from '../../components/organisms/create-game-form/create-game-form.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [CommonModule, CreateGameFormComponent],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Crear Partida | Pragma Planning Poker');
    this.metaService.updateTag({ name: 'description', content: 'Crea una nueva partida de Planning Poker' });
  }

  onGameCreated(gameName: string) {
    this.gameService.createGame(gameName).subscribe({
      next: (response) => {
        alert(`¡Partida "${response.name}" creada! Revisa la consola. El id es: ${response.id}`);
      },
      error: (err) => console.error(err)
    });
  }
}

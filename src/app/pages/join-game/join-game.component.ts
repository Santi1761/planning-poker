import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserFormComponent } from '../../components/organisms/create-user-form/create-user-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-join-game',
  standalone: true,
  imports: [CommonModule, CreateUserFormComponent],
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.scss'
})
export class JoinGameComponent implements OnInit {
  gameId: string = '';

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {

    this.titleService.setTitle('Unirse a la Partida | Pragma Planning Poker');
    this.metaService.updateTag({ name: 'description', content: 'Únete a la partida de Planning Poker' });
    this.gameId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.gameId) {

      this.router.navigate(['/']);
    }
  }

  onUserSubmit(userData: { name: string, viewMode: string }) {

    this.userService.joinGame(userData, this.gameId).subscribe({

      next: (response) => {

        this.router.navigate(['/board']);
      },
      error: (err) => console.error(err)
    });
  }
}

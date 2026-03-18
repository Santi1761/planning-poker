import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { CreateUserFormComponent } from '../../components/organisms/create-user-form/create-user-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, CreateUserFormComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Crear Usuario | Pragma Planning Poker');
    this.metaService.updateTag({ name: 'description', content: 'Crea tu usuario para la partida' });
  }

  onUserSubmit(userData: { name: string, viewMode: string }) {
    this.userService.createUser(userData).subscribe({
      next: (response) => {
        alert(`Usuario ${response.name} creado con éxito!\nRol: ${response.role}\nModo: ${response.viewMode}`);
      },
      error: (err) => console.error(err)
    });
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spectator-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spectator-badge.component.html',
  styleUrl: './spectator-badge.component.scss'
})
export class SpectatorBadgeComponent {
  @Input() initials: string = '';
}

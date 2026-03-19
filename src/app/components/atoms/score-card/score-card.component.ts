import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.scss'
})
export class ScoreCardComponent {
  @Input() value: string = '';
  @Input() isSelected: boolean = false;
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})

export class RadioComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() name: string = '';

  @Input() control: FormControl = new FormControl();

  onSelect() {
    if (this.control && this.control.value !== this.value) {
      this.control.setValue(this.value);
    }
  }
}

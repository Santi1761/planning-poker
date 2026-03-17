import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() control!: FormControl;

  get errorMessage(): string {
    if (this.control.hasError('required')) return 'Este campo es obligatorio.';
    if (this.control.hasError('minlength')) return 'Debe tener al menos 5 caracteres.';
    if (this.control.hasError('maxlength')) return 'No puede exceder los 20 caracteres.';
    if (this.control.hasError('invalidCharacters')) return 'No se permiten caracteres especiales (_,.*#/-).';
    if (this.control.hasError('tooManyNumbers')) return 'Máximo se permiten 3 números.';
    if (this.control.hasError('onlyNumbers')) return 'El nombre no puede contener solo números.';
    return '';
  }
}

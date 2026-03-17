import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { gameNameValidator } from '../../../utils/validators/game-name.validator';

@Component({
  selector: 'app-create-game-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, ButtonComponent],
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.scss'
})
export class CreateGameFormComponent {
  gameForm: FormGroup;
  isLoading: boolean = false;

  @Output() formSubmit = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder) {
    this.gameForm = this.fb.group({
      gameName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        gameNameValidator()
      ]]
    });
  }

  get gameNameControl(): FormControl {
    return this.gameForm.get('gameName') as FormControl;
  }

  onSubmit() {
    if (this.gameForm.valid) {
      this.isLoading = true;
      this.formSubmit.emit(this.gameForm.value.gameName);
    } else {
      this.gameForm.markAllAsTouched();
    }
  }
}

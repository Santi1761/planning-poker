import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { RadioComponent } from '../../atoms/radio/radio.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { gameNameValidator } from '../../../utils/validators/game-name.validator';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, RadioComponent, ButtonComponent],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  userForm: FormGroup;
  isLoading: boolean = false;

  @Output() formSubmit = new EventEmitter<{ name: string, viewMode: string }>();

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        gameNameValidator()
      ]],
      viewMode: ['jugador', Validators.required]
    });
  }

  get userNameControl(): FormControl {
    return this.userForm.get('userName') as FormControl;
  }

  get viewModeControl(): FormControl {
    return this.userForm.get('viewMode') as FormControl;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.formSubmit.emit(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}

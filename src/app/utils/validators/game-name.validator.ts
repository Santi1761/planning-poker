import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function gameNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const invalidCharsRegex = /[_,.*#/-]/;
    if (invalidCharsRegex.test(value)) {
      return { invalidCharacters: true };
    }

    const numbersMatch = value.match(/\d/g);
    if (numbersMatch && numbersMatch.length > 3) {
      return { tooManyNumbers: true };
    }

    const onlyNumbersRegex = /^\d+$/;
    if (onlyNumbersRegex.test(value)) {
      return { onlyNumbers: true };
    }

    return null;
  };
}

import { FormControl } from '@angular/forms';
import { gameNameValidator } from './game-name.validator';

describe('GameNameValidator', () => {
  const validator = gameNameValidator();

  it('debería retornar null si el nombre es válido', () => {
    const control = new FormControl('Sprint 32');
    expect(validator(control)).toBeNull();
  });

  it('debería fallar si tiene caracteres especiales', () => {
    const control = new FormControl('Sprint_32');
    expect(validator(control)).toEqual({ invalidCharacters: true });
  });

  it('debería fallar si tiene más de 3 números', () => {
    const control = new FormControl('Sprint 1234');
    expect(validator(control)).toEqual({ tooManyNumbers: true });
  });

it('debería fallar si contiene solo números', () => {
    const control = new FormControl('123');
    expect(validator(control)).toEqual({ onlyNumbers: true });
  });
});

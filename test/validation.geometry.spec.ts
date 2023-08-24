import { Geometry, ValidationResult } from '../src/types';
import { validateGeometry } from '../src/validate';

const geometry: Geometry = {
  type: 'Point',
  coordinates: [11, 22],
};
describe('validations for geometry', () => {
  it('validates valid geometry', () => {
    const result: ValidationResult = validateGeometry(geometry);
    expect(result.valid).toBeTruthy();
  });
  it('validates geometry (invalid - empty)', () => {
    const result: ValidationResult = validateGeometry(undefined as any);
    expect(result.valid).toBeFalsy();
  });
  it('validates geometry (invalid - no coordinates)', () => {
    const result: ValidationResult = validateGeometry({
      ...geometry,
      coordinates: [],
    });
    expect(result.valid).toBeFalsy();
  });
  it('validates geometry (invalid - invalid type)', () => {
    const result: ValidationResult = validateGeometry({
      ...geometry,
      type: 'Poin',
    });
    expect(result.valid).toBeFalsy();
  });
});

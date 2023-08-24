import { Feature, ValidationResult } from '../src/types';
import { validateFeature } from '../src/validate';

const feature: Feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11, 22],
  },
};
describe('validations for feature', () => {
  it('validates valid feature', () => {
    const result: ValidationResult = validateFeature(feature);
    expect(result.valid).toBeTruthy();
  });

  it('validates feature (invalid type)', () => {
    const result: ValidationResult = validateFeature({
      ...feature,
      type: 'Anything',
    } as any);
    expect(result.valid).toBeFalsy();
  });

  it('validates feature (invalid properties - not object)', () => {
    const result: ValidationResult = validateFeature({
      ...feature,
      properties: 'anything',
    } as any);
    expect(result.valid).toBeFalsy();
  });

  it('validates feature (valid properties)', () => {
    const result: ValidationResult = validateFeature({
      ...feature,
      properties: {
        prop1: 'anything',
        prop2: {
          prop3: 'something',
        },
      },
    } as any);
    expect(result.valid).toBeTruthy();
  });
});

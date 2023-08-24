import { Feature, ValidationResult } from '../src/types';
import { validateFeature, validateFeatures } from '../src/validate';

const features: Feature[] = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11, 22],
    },
  },
];
describe('validations for features', () => {
  it('validates valid features', () => {
    const result: ValidationResult = validateFeatures(features);
    expect(result.valid).toBeTruthy();
  });

  it('validates feature (invalid - empty)', () => {
    const result: ValidationResult = validateFeatures([]);
    expect(result.valid).toBeFalsy();
  });
  it('validates feature (invalid features)', () => {
    const result: ValidationResult = validateFeatures([
      {
        type: 'Feature1',
        geometry: {
          type: 'Point',
          coordinates: [11, 22],
        },
      },
    ] as any[]);
    expect(result.valid).toBeFalsy();
  });
});

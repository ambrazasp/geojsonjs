import { FeatureCollection, ValidationResult } from '../src/types';
import { validateFeatureCollection } from '../src/validate';

const featureCollection: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [11, 22],
      },
    },
  ],
};
describe('validations for feature collection', () => {
  it('validates valid feature collection', () => {
    const result: ValidationResult =
      validateFeatureCollection(featureCollection);
    expect(result.valid).toBeTruthy();
  });

  it('validates empty features in feature collection (invalid)', () => {
    const result: ValidationResult = validateFeatureCollection({
      ...featureCollection,
      features: [],
    });
    expect(result.valid).toBeFalsy();
  });

  it('validates empty feature collection (invalid)', () => {
    const result: ValidationResult = validateFeatureCollection(
      undefined as any
    );
    expect(result.valid).toBeFalsy();
  });
});

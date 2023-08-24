import {
  Feature,
  FeatureCollection,
  Geometry,
  ValidationResult,
} from '../src/types';
import { toFeature, toFeatureCollection } from '../src/utils';
import { validate } from '../src/validate';

const geometry: Geometry = {
  type: 'Point',
  coordinates: [11, 22],
};
const feature: Feature = toFeature(geometry);
const featureCollection: FeatureCollection = toFeatureCollection([feature]);

describe('validations', () => {
  it('validates geometry', () => {
    const result: ValidationResult = validate(geometry);
    expect(result.valid).toBeTruthy();
  });
  it('validates geometries', () => {
    const result: ValidationResult = validate([geometry]);
    expect(result.valid).toBeTruthy();
  });
  it('validates feature', () => {
    const result: ValidationResult = validate(feature);
    expect(result.valid).toBeTruthy();
  });
  it('validates features', () => {
    const result: ValidationResult = validate([feature]);
    expect(result.valid).toBeTruthy();
  });
  it('validates feature collection', () => {
    const result: ValidationResult = validate(featureCollection);
    expect(result.valid).toBeTruthy();
  });
  it('validates feature collections', () => {
    const result: ValidationResult = validate([featureCollection]);
    expect(result.valid).toBeTruthy();
  });
});

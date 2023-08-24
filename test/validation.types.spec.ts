import {
  FeatureCollection,
  GeometryType,
  ValidationResult,
} from '../src/types';
import {
  validateFeatureCollection,
  validateGeometryTypes,
} from '../src/validate';

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
describe('validations for geometry types', () => {
  it('validates valid geometry types (multi)', () => {
    const result: ValidationResult = validateGeometryTypes(
      [GeometryType.POINT],
      featureCollection
    );
    expect(result.valid).toBeTruthy();
  });

  it('validates valid geometry types (single)', () => {
    const result: ValidationResult = validateGeometryTypes(
      GeometryType.POINT,
      featureCollection
    );
    expect(result.valid).toBeTruthy();
  });

  it('validates invalid type (error)', () => {
    try {
      const result: ValidationResult = validateGeometryTypes(
        'anything',
        featureCollection
      );
      expect(result.valid).toBeFalsy();
    } catch (err) {
      expect(err.message).not.toBeUndefined();
    }
  });

  it("validates type that doesn't exists (invalid)", () => {
    const result: ValidationResult = validateGeometryTypes(
      GeometryType.LINE_STRING,
      featureCollection
    );
    expect(result.valid).toBeFalsy();
  });
});

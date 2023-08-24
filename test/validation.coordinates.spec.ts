import { GeometryType, ValidationResult } from '../src/types';
import { validateCoordinates } from '../src/validate';

const coordinatesValid = [11, 22];
const coordinatesTooLong = [11, 22, 33];
const coordinatesTooShort = [11];
const coordinatesString = ['11', '22'];

const coordinatesMulti = [
  [11, 22],
  [22, 33],
];

describe('validations for coordinates', () => {
  it('validates x,y,z coordinates (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      GeometryType.POINT,
      coordinatesTooLong
    );
    expect(result.valid).toBeFalsy();
  });

  it('validates x coordinate (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      GeometryType.POINT,
      coordinatesTooShort
    );
    expect(result.valid).toBeFalsy();
  });

  it('validates string coordinates (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      GeometryType.POINT,
      coordinatesString as any
    );
    expect(result.valid).toBeFalsy();
  });

  it('validates undefined coordinates (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      GeometryType.POINT,
      undefined as any
    );
    expect(result.valid).toBeFalsy();
  });

  it('validates too deep for type (array in array) (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      GeometryType.POINT,
      coordinatesMulti
    );
    expect(result.valid).toBeFalsy();
  });

  it('validates without type (invalid)', () => {
    const result: ValidationResult = validateCoordinates('', coordinatesValid);
    expect(result.valid).toBeFalsy();
  });

  it('validates invalid type (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      'Poin',
      coordinatesValid
    );
    expect(result.valid).toBeFalsy();
  });

  it('validates empty coordinates (invalid)', () => {
    const result: ValidationResult = validateCoordinates(
      GeometryType.POINT,
      []
    );
    expect(result.valid).toBeFalsy();
  });

  describe('validations for Point', () => {
    const coordinatesValid = [11, 22];
    it('validates valid coordinates', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.POINT,
        coordinatesValid
      );
      expect(result.valid).toBeTruthy();
    });

    it('validates coordinates (invalid - too deep)', () => {
      const result: ValidationResult = validateCoordinates(GeometryType.POINT, [
        coordinatesValid,
      ]);
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.POINT,
        coordinatesValid[0] as any
      );
      expect(result.valid).toBeFalsy();
    });
  });

  describe('validations for LineString', () => {
    const coordinatesValid = [
      [11, 22],
      [22, 33],
    ];

    it('validates valid coordinates', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.LINE_STRING,
        coordinatesValid
      );
      expect(result.valid).toBeTruthy();
    });

    it('validates coordinates (invalid - too deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.LINE_STRING,
        [coordinatesValid]
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.LINE_STRING,
        coordinatesValid[0] as any
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough points)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.LINE_STRING,
        coordinatesValid.slice(1)
      );
      expect(result.valid).toBeFalsy();
    });
  });

  describe('validations for MultiPoint', () => {
    const coordinatesValid = [
      [11, 22],
      [22, 33],
    ];
    it('validates valid coordinates', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POINT,
        coordinatesValid
      );
      expect(result.valid).toBeTruthy();
    });

    it('validates coordinates (invalid - too deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POINT,
        [coordinatesValid]
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POINT,
        coordinatesValid[0] as any
      );
      expect(result.valid).toBeFalsy();
    });
  });

  describe('validations for Polygon', () => {
    const coordinatesValid = [
      [
        [11, 22],
        [22, 33],
      ],
      [
        [33, 44],
        [44, 55],
      ],
      [
        [11, 22],
        [22, 33],
      ],
    ];
    const coordinatesInvalid = [
      [
        [11, 22],
        [22, 33],
      ],
      [
        [33, 44],
        [44, 55],
      ],
      [
        [55, 66],
        [66, 77],
      ],
    ];
    it('validates valid coordinates', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.POLYGON,
        coordinatesValid
      );
      expect(result.valid).toBeTruthy();
    });

    it('validates coordinates (invalid - too deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.POLYGON,
        [coordinatesValid]
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.POLYGON,
        coordinatesValid[0] as any
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough points)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.POLYGON,
        coordinatesValid.slice(1)
      );
      expect(result.valid).toBeFalsy();
    });

    it("validates coordinates (invalid - doesn't close)", () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POLYGON,
        coordinatesInvalid
      );
      expect(result.valid).toBeFalsy();
    });
  });

  describe('validations for MultiLineString', () => {
    const coordinatesValid = [
      [
        [11, 22],
        [22, 33],
      ],
      [
        [33, 44],
        [44, 55],
      ],
      [
        [55, 66],
        [66, 77],
      ],
    ];
    it('validates valid coordinates', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_LINE_STRING,
        coordinatesValid
      );
      expect(result.valid).toBeTruthy();
    });

    it('validates coordinates (invalid - too deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_LINE_STRING,
        [coordinatesValid]
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_LINE_STRING,
        coordinatesValid[0] as any
      );
      expect(result.valid).toBeFalsy();
    });
  });

  describe('validations for MultiPolygon', () => {
    const coordinatesValid = [
      [
        [
          [11, 22],
          [22, 33],
        ],
        [
          [33, 44],
          [44, 55],
        ],
        [
          [11, 22],
          [22, 33],
        ],
      ],
    ];
    it('validates valid coordinates', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POLYGON,
        coordinatesValid
      );
      expect(result.valid).toBeTruthy();
    });

    it('validates coordinates (invalid - too deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POLYGON,
        [coordinatesValid] as any
      );
      expect(result.valid).toBeFalsy();
    });

    it('validates coordinates (invalid - not enough deep)', () => {
      const result: ValidationResult = validateCoordinates(
        GeometryType.MULTI_POLYGON,
        coordinatesValid[0] as any
      );
      expect(result.valid).toBeFalsy();
    });
  });
});

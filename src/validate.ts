import { isNumber, isObject } from 'lodash';
import {
  AllTypes,
  CoordinatesTypes,
  Feature,
  FeatureCollection,
  GenericObject,
  Geometry,
  GeometryType,
  ValidationError,
  ValidationResult,
} from './types';
import { getGeometries } from './functions';

function transformResponse(
  error?: string,
  data?: GenericObject | GenericObject[]
): ValidationResult {
  if (error) {
    return {
      valid: false,
      error,
      data,
    };
  }

  return { valid: true };
}

export function validateCoordinatesByDepth(
  coordinates: any[],
  depth: number = 0
): boolean {
  if (depth === 0) {
    return Array.isArray(coordinates) && coordinates.every((c) => isNumber(c));
  }

  if (!Array.isArray(coordinates)) return false;

  return coordinates.every((c) => validateCoordinatesByDepth(c, depth - 1));
}

export function validateCoordinates(
  type: string,
  coordinates: CoordinatesTypes
): ValidationResult {
  if (!coordinates?.length) {
    return transformResponse(ValidationError.EMPTY_COORDINATES);
  }

  if (!type) {
    return transformResponse(ValidationError.EMPTY_TYPE);
  }

  if (!Object.values(GeometryType).includes(type)) {
    return transformResponse(ValidationError.INVALID_TYPE, {
      type: type,
    });
  }

  let valid = false;
  if ([GeometryType.POINT].includes(type)) {
    valid = validateCoordinatesByDepth(coordinates, 0);
  } else if (
    [GeometryType.MULTI_POINT, GeometryType.LINE_STRING].includes(type)
  ) {
    valid = validateCoordinatesByDepth(coordinates, 1);
  } else if (
    [GeometryType.MULTI_LINE_STRING, GeometryType.POLYGON].includes(type)
  ) {
    valid = validateCoordinatesByDepth(coordinates, 2);
  } else if ([GeometryType.MULTI_POLYGON].includes(type)) {
    valid = validateCoordinatesByDepth(coordinates, 3);
  }

  if (!valid) {
    return transformResponse(ValidationError.INVALID_COORDINATES, {
      coordinates,
    });
  }

  return transformResponse();
}

export function validateGeometry(geom: Geometry): ValidationResult {
  const coordinates = geom?.coordinates;

  if (!coordinates?.length) {
    return transformResponse(ValidationError.EMTPY);
  }

  return validateCoordinates(geom?.type, coordinates);
}

export function validateFeature(feature: Feature): ValidationResult {
  if (feature.type !== 'Feature') {
    return transformResponse(ValidationError.INVALID_TYPE, {
      type: feature.type,
    });
  } else if (feature?.properties && !isObject(feature.properties)) {
    return transformResponse(ValidationError.INVALID_PROPERTIES, {
      properties: feature.properties,
    });
  }

  return validateGeometry(feature?.geometry);
}

export function validateFeatures(features: Feature[]): ValidationResult {
  const invalidFeatures = features
    ?.map((feature, index) => {
      const valid = validateFeature(feature);
      return {
        ...valid,
        featureIndex: index,
      };
    })
    .filter((i) => !i.valid);

  if (invalidFeatures?.length > 0) {
    return transformResponse(ValidationError.INVALID_FEATURES, invalidFeatures);
  }

  return transformResponse();
}

export function validateFeatureCollection(
  geom: FeatureCollection
): ValidationResult {
  if (!geom) {
    return transformResponse(ValidationError.EMTPY);
  } else if (!geom?.features?.length) {
    return transformResponse(ValidationError.EMPTY_FEATURES);
  }

  return validateFeatures(geom.features);
}

export function validateGeometryTypes(
  types: string | string[],
  geom: AllTypes
) {
  if (!Array.isArray(types)) types = [types];

  const everyTypeValid = types.every((t) =>
    Object.values(GeometryType).includes(t)
  );

  if (!everyTypeValid) {
    throw new Error(`Passed types are not valid - ["${types.join("', '")}"]`);
  }

  const invalidTypes = getGeometries(geom)
    .map((item) => item.type)
    .filter((t) => !types.includes(t));

  if (!invalidTypes?.length) {
    return transformResponse(ValidationError.INVALID_TYPE, {
      types: invalidTypes,
    });
  }

  return transformResponse();
}

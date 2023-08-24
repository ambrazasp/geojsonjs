import { isEqual, isNumber, isObject } from 'lodash';
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
import { getFeatureCollection, getGeometries } from './functions';

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

export function validate(geom: AllTypes) {
  const featureCollection: FeatureCollection = getFeatureCollection(geom);
  return validateFeatureCollection(featureCollection);
}

export function validateCoordinatesByDepth(
  coordinates: any[],
  depth: number = 0
): ValidationResult {
  if (depth === 0) {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return transformResponse(ValidationError.INVALID_COORDINATES, {
        coordinates,
      });
    }

    const everyItemIsNumber = coordinates.every((c) => isNumber(c));

    if (!everyItemIsNumber) {
      return transformResponse(ValidationError.INVALID_COORDINATES, {
        coordinates,
      });
    }

    return transformResponse();
  }

  if (!Array.isArray(coordinates)) {
    return transformResponse(ValidationError.INVALID_COORDINATES, {
      coordinates,
    });
  }

  const invalidCoordinates = coordinates
    .map((c) => validateCoordinatesByDepth(c, depth - 1))
    .filter((i) => !i.valid);

  if (invalidCoordinates?.length) {
    return transformResponse(ValidationError.INVALID_COORDINATES, {
      coordinates: invalidCoordinates,
    });
  }

  return transformResponse();
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

  function handleMulti(type: string) {
    const invalidCoordinates = coordinates
      .map((c) => validateCoordinates(type, c as any))
      .filter((i) => !i.valid);

    if (!invalidCoordinates?.length) return transformResponse();

    return transformResponse(ValidationError.INVALID_COORDINATES, {
      coordinates: invalidCoordinates,
    });
  }

  if (type === GeometryType.POINT) {
    return validateCoordinatesByDepth(coordinates, 0);
  } else if (type === GeometryType.LINE_STRING) {
    // line should have at least 2 points
    if (coordinates?.length < 2) {
      return transformResponse(ValidationError.INVALID_COORDINATES, {
        coordinates,
      });
    }
    return validateCoordinatesByDepth(coordinates, 1);
  } else if (type === GeometryType.POLYGON) {
    // polygon should have at least 3 points
    if (coordinates?.length < 3) {
      return transformResponse(ValidationError.INVALID_COORDINATES, {
        coordinates,
      });
    }
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];
    if (!isEqual(start, end)) {
      return transformResponse(ValidationError.INVALID_COORDINATES, {
        coordinates,
      });
    }

    return validateCoordinatesByDepth(coordinates, 2);
  } else if (type === GeometryType.MULTI_POINT) {
    return handleMulti(GeometryType.POINT);
  } else if (type === GeometryType.MULTI_LINE_STRING) {
    return handleMulti(GeometryType.LINE_STRING);
  } else if (type === GeometryType.MULTI_POLYGON) {
    return handleMulti(GeometryType.POLYGON);
  }
}

export function validateGeometry(geom: Geometry): ValidationResult {
  if (!geom) {
    return transformResponse(ValidationError.EMTPY);
  }

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
  if (!features?.length) {
    return transformResponse(ValidationError.EMPTY_FEATURES);
  }

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

  if (invalidTypes?.length) {
    return transformResponse(ValidationError.INVALID_TYPE, {
      types: invalidTypes,
    });
  }

  return transformResponse();
}

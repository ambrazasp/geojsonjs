import {
  AllTypes,
  CoordinatesTypes,
  FEATURE_COLLECTION_TYPE,
  FEATURE_TYPE,
  Feature,
  FeatureCollection,
  GenericObject,
  Geometry,
} from '../types';

export function toFeatureCollection(features: Feature[]): FeatureCollection {
  return {
    type: FEATURE_COLLECTION_TYPE,
    features,
  };
}

export function toFeature(
  geometry: Geometry,
  properties?: GenericObject
): Feature {
  return {
    type: FEATURE_TYPE,
    geometry,
    properties: properties || null,
  };
}

export function toGeometry(
  type: string,
  coordinates: CoordinatesTypes
): Geometry {
  return {
    type,
    coordinates,
  };
}

import {
  AllTypes,
  CoordinatesTypes,
  FEATURE_COLLECTION_TYPE,
  FEATURE_TYPE,
  Feature,
  FeatureCollection,
  GenericObject,
  Geometry,
  GeometryType,
} from './types';
import { validateCoordinates } from './validate';

function getFeatureCollectionWithFeatures(
  features: Feature[]
): FeatureCollection {
  return {
    type: FEATURE_COLLECTION_TYPE,
    features,
  };
}

function getFeatureWithGeometry(
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
  const result = validateCoordinates(type, coordinates);
  if (!result.valid) {
    throw new Error('Invalid coordinates');
  }

  return {
    type,
    coordinates,
  };
}

export function toFeature(
  type: string,
  coordinates: CoordinatesTypes,
  properties?: GenericObject
): Feature {
  return getFeatureWithGeometry(toGeometry(type, coordinates), properties);
}

export function toFeatureCollection(
  data: Array<{
    type: string;
    coordinates: CoordinatesTypes;
    properties?: GenericObject;
  }>
) {
  const features = data.map((item) =>
    toFeature(item.type, item.coordinates, item.properties)
  );

  return getFeatureCollectionWithFeatures(features);
}

export function getGeometries(geom: AllTypes): Geometry[] {
  return getFeatures(geom).map((feature) => feature.geometry);
}

export function getFeatures(geom: AllTypes): Feature[] {
  if (Array.isArray(geom)) {
    return geom
      .map((g) => getFeatures(g))
      .reduce((acc: Feature[], item: Feature[]) => [...acc, ...item], []);
  } else if (geom.type === FEATURE_COLLECTION_TYPE) {
    return (geom as FeatureCollection).features;
  } else if (geom.type === FEATURE_TYPE) {
    return [geom as Feature];
  } else if (Object.values(GeometryType).includes(geom.type)) {
    return [getFeatureWithGeometry(geom as Geometry)];
  }

  return [];
}

export function getFeatureCollection(geom: AllTypes): FeatureCollection {
  return getFeatureCollectionWithFeatures(getFeatures(geom));
}
import {
  AllTypes,
  CoordinatesTypes,
  FEATURE_COLLECTION_TYPE,
  FEATURE_TYPE,
  Feature,
  FeatureCollection,
  GEOMETRY_COLLECTION,
  GenericObject,
  Geometry,
  GeometryType,
} from './types';
import * as utils from './utils';

type ParseData = {
  type: string;
  coordinates?: CoordinatesTypes;
  geometries?: Geometry[];
  properties?: GenericObject;
};

export function parse(data: ParseData[] | ParseData): FeatureCollection {
  if (Array.isArray(data)) {
    return getFeatureCollection(data.map((item) => parse(item)));
  }

  if (data.type === GEOMETRY_COLLECTION) {
    return parse(data.geometries);
  }

  const feature: Feature = utils.toFeature(
    utils.toGeometry(data.type, data.coordinates),
    data.properties
  );

  return getFeatureCollection(feature);
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
    return [utils.toFeature(geom as Geometry)];
  }

  return [];
}

export function getFeatureCollection(geom: AllTypes): FeatureCollection {
  return utils.toFeatureCollection(getFeatures(geom));
}

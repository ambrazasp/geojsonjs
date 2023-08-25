export type GenericObject = { [key: string]: any };

export type CoordinatesPoint = number[];
export type CoordinatesMultiPoint = CoordinatesPoint[];
export type CoordinatesLineString = CoordinatesPoint[];
export type CoordinatesMultiLineString = CoordinatesLineString[];
export type CoordinatesPolygon = CoordinatesLineString[];
export type CoordinatesMultiPolygon = CoordinatesPolygon[];

export const FEATURE_COLLECTION_TYPE = 'FeatureCollection';
export const FEATURE_TYPE = 'Feature';
export const GEOMETRY_COLLECTION = 'GeometryCollection';

export type CoordinatesTypes =
  | CoordinatesPoint
  | CoordinatesLineString
  | CoordinatesPolygon
  | CoordinatesMultiPoint
  | CoordinatesMultiLineString
  | CoordinatesMultiPolygon;

export type Geometry = {
  type: string;
  coordinates: CoordinatesTypes;
};

export type GeometryCollection = {
  type: 'GeometryCollection';
  geometries: Geometry[];
};

export type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};

export type Feature = {
  type: 'Feature';
  geometry: Geometry;
  properties?: GenericObject;
};

export const ValidationError = {
  EMTPY: 'EMTPY',
  EMPTY_FEATURES: 'EMPTY_FEATURES',
  EMPTY_COORDINATES: 'INVALID_COORDINATES',
  EMPTY_TYPE: 'EMPTY_TYPE',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_FEATURES: 'INVALID_FEATURES',
  INVALID_COORDINATES: 'INVALID_COORDINATES',
  INVALID_PROPERTIES: 'INVALID_PROPERTIES',
};

export const GeometryType = {
  POINT: 'Point',
  MULTI_POINT: 'MultiPoint',
  LINE_STRING: 'LineString',
  MULTI_LINE_STRING: 'MultiLineString',
  POLYGON: 'Polygon',
  MULTI_POLYGON: 'MultiPolygon',
};

export type AllTypes =
  | Geometry
  | Geometry[]
  | Feature
  | Feature[]
  | FeatureCollection
  | FeatureCollection[]
  | GeometryCollection
  | GeometryCollection[];

export type ValidationResult = {
  valid: boolean;
  error?: string;
  data?: GenericObject | GenericObject[];
};

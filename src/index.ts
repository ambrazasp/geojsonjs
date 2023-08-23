import _ from 'lodash';
import { GeoJSON } from './geojson';

export * from './validate';
export * from './types';
export * from './helpers';
export * from './geojson';

export default function geojson(geom?: any): GeoJSON {
  return new GeoJSON(geom);
}

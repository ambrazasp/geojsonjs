import { AllTypes, FeatureCollection, Geometry } from './types';
import { getFeatureCollection, getFeatures } from './helpers';
import { validateFeatureCollection } from './validate';

export class GeoJSON {
  private _geom: FeatureCollection;
  constructor(geom?: FeatureCollection | Geometry) {
    this._geom = getFeatureCollection(geom);
  }

  get isValid() {
    return this.validate().valid;
  }

  validate() {
    return validateFeatureCollection(this._geom);
  }

  add(geom: AllTypes) {
    const features = getFeatures(geom);
    this._geom = getFeatureCollection([...this._geom.features, ...features]);
    return this;
  }

  toJson() {
    return this._geom;
  }

  toString() {
    return JSON.stringify(this._geom);
  }
}

# Documentation

## geojson

```js
import geojson from 'geojsonjs';

const geom = {
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

const valid = geojson(geom).isValid;
```

| Param        | Description                                     | Response            |
| ------------ | ----------------------------------------------- | ------------------- |
| `isValid`    | Returns if valid or not                         | `boolean`           |
| `validate()` | Validates feature collection                    | `ValidationResult`  |
| `add()`      | Adds any type of geometry to feature collection |                     |
| `toJSON()`   | Computes Feature Collection                     | `FeatureCollection` |
| `toString()` | Computes Feature Collection string              | `string`            |

## Global functions

| Name                               | Returns             |                                                |
| ---------------------------------- | ------------------- | ---------------------------------------------- |
| `getFeatureCollectionWithFeatures` | `FeatureCollection` | [More info](#getfeaturecollectionwithfeatures) |
| `getFeatureWithGeometry`           | `Feature`           | [More info](#getfeaturewithgeometry)           |
| `toGeometry`                       | `Geometry`          | [More info](#togeometry)                       |
| `toFeature`                        | `Feature`           | [More info](#tofeature)                        |
| `toFeatureCollection`              | `FeatureCollection` | [More info](#tofeaturecollection)              |
| `getGeometries`                    | `Geometry[]`        | [More info](#getgeometries)                    |
| `getFeatures`                      | `Feature[]`         | [More info](#getfeatures)                      |
| `getFeatureCollection`             | `FeatureCollection` | [More info](#getfeaturecollection)             |

## getFeatureCollectionWithFeatures

Accepts only `Feature[]`

Example:

```js
const valid = getFeatureCollectionWithFeatures([
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11, 22],
    },
  },
]);
```

## getFeatureWithGeometry

Accepts only `Geometry` and `properties`

Example:

```js
const valid = getFeatureWithGeometry(
  {
    type: 'Point',
    coordinates: [11, 22],
  },
  { prop1: 'data' }
);
```

## toGeometry

Accepts only `type` and `coordinates`

Example:

```js
const valid = getFeatureWithGeometry('Point', [11, 22]);
```

## toFeature

Accepts only `type`, `coordinates` and `properties`

Example:

```js
const valid = toFeature('Point', [11, 22], { prop1: 'data' });
```

## toFeatureCollection

Accepts only array of `type`, `coordinates` and `properties`

Example:

```js
const valid = toFeatureCollection([
  {
    type: 'Point',
    coordinates: [11, 22],
    properties: { prop1: 'data' },
  },
]);
```

## getGeometries

Accepts all types of geometries

Example:

```js
const valid = getGeometries({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11, 22],
  },
});
```

## getFeatures

Accepts all types of geometries

Example:

```js
const valid = getFeatures({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11, 22],
  },
});
```

## getFeatureCollection

Accepts all types of geometries

Example:

```js
const valid = getFeatureCollection({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11, 22],
  },
});
```

## Validation

Documentation about validation can be found [here](/docs/validation.md)

## Types

Documentation about types can be found [here](/docs/types.md)

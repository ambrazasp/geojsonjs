# Validation

| Name                        | Params                                        |                                         |
| --------------------------- | --------------------------------------------- | --------------------------------------- |
| `validateCoordinates`       | `type: string, coordinates: CoordinatesTypes` | [More info](#validatecoordinates)       |
| `validateGeometry`          | `geom: Geometry`                              | [More info](#validategeometry)          |
| `validateFeature`           | `feature: Feature`                            | [More info](#validatefeature)           |
| `validateFeatures`          | `features: Feature[]`                         | [More info](#validatefeatures)          |
| `validateFeatureCollection` | `collection: FeatureCollection`               | [More info](#validatefeaturecollection) |

Each validation returns
[ValidationResult](#validation-result) response

## validateCoordinates

Example:

```js
const valid = validateCoordinates('Point', [11, 12]);
```

## validateGeometry

Example:

```js
const valid = validateGeometry({
  type: 'Point',
  coordinates: [11, 22],
});
```

## validateFeature

Example:

```js
const valid = validateFeature({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11, 22],
  },
});
```

## validateFeatures

Example:

```js
const valid = validateFeatures([
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11, 22],
    },
  },
]);
```

## validateFeatureCollection

Example:

```js
const valid = validateFeatureCollection({
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
});
```

## `ValidationResult`<a id='validation-result'></a>

Type, that consists of:

```js
{
  valid: true | false,
  error?: 'VALIDATION_ERROR',
  data?: GenericObject | null // only for error
}
```

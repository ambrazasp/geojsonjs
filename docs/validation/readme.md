# Validation

| Name                        | Params                                        |                                         |
| --------------------------- | --------------------------------------------- | --------------------------------------- |
| `validateCoordinates`       | `type: string, coordinates: CoordinatesTypes` | [More info](#validatecoordinates)       |
| `validateGeometry`          | `geom: Geometry`                              | [More info](#validategeometry)          |
| `validateFeature`           | `feature: Feature`                            | [More info](#validatefeature)           |
| `validateFeatures`          | `features: Feature[]`                         | [More info](#validatefeatures)          |
| `validateFeatureCollection` | `collection: FeatureCollection`               | [More info](#validatefeaturecollection) |
| `validateGeometryTypes`     | `types: string \| string [], geom: AllTypes`  | [More info](#validategeometrytypes)     |

Each validation returns
[ValidationResult](#validationresult) response

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

## validateGeometryTypes

Example:

```js
const valid = validateGeometryTypes(['Point'], {
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

## ValidationResult

Type, that consists of:

```js
{
  valid: true | false,
  error?: 'VALIDATION_ERROR',
  data?: GenericObject | null // only for error
}
```

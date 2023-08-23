# Types

| Name              |                                 |
| ----------------- | ------------------------------- |
| `ValidationError` | [More info](#validation-errors) |
| `Geometry types`  | [More info](#geometry-types)    |

## Validation Errors

```js
const ValidationError = {
  EMTPY: 'EMTPY',
  EMPTY_FEATURES: 'EMPTY_FEATURES',
  EMPTY_COORDINATES: 'INVALID_COORDINATES',
  EMPTY_TYPE: 'EMPTY_TYPE',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_FEATURES: 'INVALID_FEATURES',
  INVALID_COORDINATES: 'INVALID_COORDINATES',
  INVALID_PROPERTIES: 'INVALID_PROPERTIES',
};
```

## Geometry types

```js
const GeometryType = {
  POINT: 'Point',
  MULTI_POINT: 'MultiPoint',
  LINE_STRING: 'LineString',
  MULTI_LINE_STRING: 'MultiLineString',
  POLYGON: 'Polygon',
  MULTI_POLYGON: 'MultiPolygon',
};
```

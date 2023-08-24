# Build and validate GeoJSON with Node.js

[![License](https://img.shields.io/github/license/ambrazasp/geojsonjs)](https://github.com/ambrazasp/geojsonjs/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/ambrazasp/geojsonjs)](https://github.com/ambrazasp/geojsonjs/issues)
[![GitHub stars](https://img.shields.io/github/stars/ambrazasp/geojsonjs)](https://github.com/ambrazasp/geojsonjs/stargazers)

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About the Project

The GeoJSON.js is designed to build and validate GeoJSON feature collections.

## Getting Started

To get started with the GeoJSON.js, install `geojsonjs` package to your project.

```bash
npm i geojsonjs
yarn add geojsonjs
```

## Usage

```js
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

import { toFeatureCollection } from 'geojsonjs';
const featureCollection = toFeatureCollection(geom);
const result = validate(featureCollection);

// TypeScript
import {
  toFeatureCollection,
  FeatureCollection,
  ValidationResult,
} from 'geojsonjs';
const featureCollection: FeatureCollection = toFeatureCollection(geom);
const result: ValidationResult = validate(featureCollection);
```

# Documentation

## Global functions

| Name                   | Returns             |                                    |
| ---------------------- | ------------------- | ---------------------------------- |
| `parse`                | `FeatureCollection` | [More info](#parse)                |
| `getGeometries`        | `Geometry[]`        | [More info](#getgeometries)        |
| `getFeatures`          | `Feature[]`         | [More info](#getfeatures)          |
| `getFeatureCollection` | `FeatureCollection` | [More info](#getfeaturecollection) |

### parse

Accepts array or object of `type`, `coordinates` and `properties` (optional)

Returns [feature collection](#feature-collection)

**Example:**

```js
import { parse } from 'geojsonjs';

const featureCollection = parse({ type: 'Point', coordinates: [11, 22] });
const featureCollection2 = parse([
  { type: 'Point', coordinates: [11, 22], properties: { prop1: 'prop1' } },
]);

// TypeScript
import { parse, FeatureCollection } from 'geojsonjs';

const featureCollection: FeatureCollection = parse({
  type: 'Point',
  coordinates: [11, 22],
});
const featureCollection2: FeatureCollection = parse([
  { type: 'Point', coordinates: [11, 22], properties: { prop1: 'prop1' } },
]);
```

### getGeometries

Finds and returns all geometries from data.

Supports [all geometry types](#supported-types).

Returns [array of geometries](#geometries-array)

**Example:**

```js
import { getGeometries } from 'geojson';
const geometries = getGeometries(geom);

// TypeScript
import { getGeometries, Geometry } from 'geojson';
const geometries: Geometry[] = getGeometries(geom);
```

### getFeatures

Finds and returns all features from data.

Supports [all geometry types](#supported-types).

Returns [array of features](#features-array)

**Example:**

```js
import { getFeatures } from 'geojson';
const features = getFeatures(geom);

// TypeScript
import { getFeatures, Feature } from 'geojson';
const features: Feature[] = getFeatures(geom);
```

### getFeatureCollection

Finds and returns feature collection from data.

Supports [all geometry types](#supported-types).

Returns [feature collection](#feature-collection)

**Example:**

```js
import { getFeatureCollection } from 'geojson';
const featureCollection = getFeatureCollection(geom);

// TypeScript
import { getFeatureCollection, FeatureCollection } from 'geojson';
const featureCollection: FeatureCollection = getFeatureCollection(geom);
```

## Validation

Each validation returns
[Validation Result](#validation-result) response

| Name                        | Params                                        |                                         |
| --------------------------- | --------------------------------------------- | --------------------------------------- |
| `validateCoordinates`       | `type: string, coordinates: CoordinatesTypes` | [More info](#validatecoordinates)       |
| `validateGeometry`          | `geometry: Geometry`                          | [More info](#validategeometry)          |
| `validateFeature`           | `feature: Feature`                            | [More info](#validatefeature)           |
| `validateFeatures`          | `features: Feature[]`                         | [More info](#validatefeatures)          |
| `validateFeatureCollection` | `collection: FeatureCollection`               | [More info](#validatefeaturecollection) |
| `validateGeometryTypes`     | `types: string \| string [], geom: AllTypes`  | [More info](#validategeometrytypes)     |

### validateCoordinates

Accepts `type` and `coordinates`.

**Example:**

```js
import { validateCoordinates } from 'geojsonjs';
const result = validateCoordinates('Point', [11, 12]);

// TypeScript
import { validateCoordinates, ValidationResult } from 'geojsonjs';
const result: ValidationResult = validateCoordinates('Point', [11, 12]);
```

### validateGeometry

Accepts [geometry](#geometry)

**Example:**

```js
const geometry = { type: 'Point', coordinates: [11, 22] };

import { validateGeometry } from 'geojsonjs';
const result = validateGeometry(geometry);

// TypeScript
import { validateGeometry, ValidationResult } from 'geojsonjs';
const result: ValidationResult = validateGeometry(geometry);
```

### validateFeature

Accepts [feature](#feature)

**Example:**

```js
const feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11, 22],
  },
};

import { validateFeature } from 'geojsonjs';
const result = validateFeature(feature);

// TypeScript
import { validateFeature, ValidationResult } from 'geojsonjs';
const result: ValidationResult = validateFeature(feature);
```

### validateFeatures

Accepts [features array](#features-array)

**Example:**

```js
const features = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [11, 22],
    },
  },
];

import { validateFeatures } from 'geojsonjs';
const result = validateFeatures(features);

// TypeScript
import { validateFeatures, ValidationResult } from 'geojsonjs';
const result: ValidationResult = validateFeatures(features);
```

### validateFeatureCollection

Accepts [feature collection](#feature-collection)

**Example:**

```js
const featureCollection = {
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

import { validateFeatureCollection } from 'geojsonjs';
const result = validateFeatureCollection(featureCollection);

// TypeScript
import { validateFeatureCollection, ValidationResult } from 'geojsonjs';
const result: ValidationResult = validateFeatureCollection(featureCollection);
```

### validateGeometryTypes

**Example:**
Accepts [geometry type OR array of geometry types](#geometry-types) and [feature collection](#feature-collection)

```js
const featureCollection = {
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
import { GeometryType, validateGeometryTypes } from 'geojsonjs';
const result = validateGeometryTypes([GeometryType.POINT], featureCollection);

// TypeScript
import {
  GeometryType,
  validateGeometryTypes,
  ValidationResult,
} from 'geojsonjs';
const result: ValidationResult = validateGeometryTypes(
  GeometryType.POINT,
  featureCollection
);
```

## Types

- Geometry types
  - [Feature Collection](#feature-collection)
  - [Feature Collections (array)](#feature-collections-array)
  - [Feature](#feature)
  - [Features (array)](#features-array)
  - [Geometry](#geometry)
  - [Geometries (array)](#geometries-array)
- [Geometry item types](#geometry-types)
  - Point
  - MultiPoint
  - LineString
  - MultiLineString
  - Polygon
  - MultiPolygon
- [Validation result](#validation-result)
- [Validation errors](#validation-errors)

### Feature Collection

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [11, 22]
      }
    }
  ]
}
```

### Feature Collections (array)

```json
[
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [11, 22]
        }
      }
    ]
  },
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [33, 44]
        }
      }
    ]
  }
]
```

### Feature

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [11, 22]
  }
}
```

### Features (array)

```json
[
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [11, 22]
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [33, 44]
    }
  }
]
```

### Geometry

```json
{
  "type": "Point",
  "coordinates": [11, 22]
}
```

### Geometries (array)

```json
[
  {
    "type": "Point",
    "coordinates": [11, 22]
  },
  {
    "type": "Point",
    "coordinates": [33, 44]
  }
]
```

### Geometry types

```js
import { GeometryType } from 'geojsonjs';

GeometryType.POINT; // Point
GeometryType.MULTI_POINT; // MultiPoint
GeometryType.LINE_STRING; // LineString
GeometryType.MULTI_LINE_STRING; // MultiLineString
GeometryType.POLYGON; // Polygon
GeometryType.MULTI_POLYGON; // MultiPolygon
```

### Validation Result˝

**Valid example:**

```json
{
  "valid": true
}
```

**Invalid example:**

```json
{
  "valid": false,
  "error": "INVALID_TYPE",
  "data": {
    "type": "Pointt"
  }
}
```

### Validation Errors

```js
import { ValidationError } from 'geojsonjs';

ValidationError.EMTPY; // EMTPY
ValidationError.EMPTY_FEATURES; // EMPTY_FEATURES
ValidationError.EMPTY_COORDINATES; // INVALID_COORDINATES
ValidationError.EMPTY_TYPE; // EMPTY_TYPE
ValidationError.INVALID_TYPE; // INVALID_TYPE
ValidationError.INVALID_FEATURES; // INVALID_FEATURES
ValidationError.INVALID_COORDINATES; // INVALID_COORDINATES
ValidationError.INVALID_PROPERTIES; // INVALID_PROPERTIES
```

Documentation can be found [here](/docs/readme.md)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request. For more information, see the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).

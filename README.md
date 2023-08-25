# Build and validate GeoJSON with Node.js

[![License](https://img.shields.io/github/license/ambrazasp/geojsonjs)](https://github.com/ambrazasp/geojsonjs/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/ambrazasp/geojsonjs)](https://github.com/ambrazasp/geojsonjs/issues)
[![GitHub stars](https://img.shields.io/github/stars/ambrazasp/geojsonjs)](https://github.com/ambrazasp/geojsonjs/stargazers)

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Global functions](#global-functions)
  - [Validation](#validation)
  - [Types](#types)
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

import { getFeatureCollection, validate } from 'geojsonjs';
const featureCollection = getFeatureCollection(geom);
const result = validate(featureCollection);

// TypeScript
import {
  getFeatureCollection,
  validate,
  FeatureCollection,
  ValidationResult,
} from 'geojsonjs';
const featureCollection: FeatureCollection = getFeatureCollection(geom);
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

Accepts array or object of `type`, `coordinates` and `properties` (optional).

Also you can parse `GeometryCollection` (object or array of objects). In that case instead of `coordinates` and `properties` it uses `geometries`.

Returns [feature collection](#feature-collection)

**Example:**

```js
import { parse } from 'geojsonjs';

const point1 = { type: 'Point', coordinates: [11, 22] };
const point2 = {
  type: 'Point',
  coordinates: [11, 22],
  properties: { prop1: 'prop1' },
};
const geometryCollection = {
  type: 'GeometryCollection',
  geometries: [{ type: 'Point', coordinates: [11, 22] }],
};

const featureCollection = parse(point1);
const featureCollection2 = parse([point1, point2]);
const featureCollection3 = parse(geometryCollection);

// TypeScript
import { parse, FeatureCollection } from 'geojsonjs';

const featureCollection: FeatureCollection = parse(point1);
const featureCollection2: FeatureCollection = parse([point1, point2]);
const featureCollection3: FeatureCollection = parse(geometryCollection);
```

### getGeometries

Finds and returns all geometries from data.

Supports [all geometry types](#types).

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

Supports [all geometry types](#types).

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

Supports [all geometry types](#types).

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
| `validate`                  | `geom: AllTypes`                              | [More info](#validate)                  |
| `validateCoordinates`       | `type: string, coordinates: CoordinatesTypes` | [More info](#validatecoordinates)       |
| `validateGeometry`          | `geometry: Geometry`                          | [More info](#validategeometry)          |
| `validateFeature`           | `feature: Feature`                            | [More info](#validatefeature)           |
| `validateFeatures`          | `features: Feature[]`                         | [More info](#validatefeatures)          |
| `validateFeatureCollection` | `collection: FeatureCollection`               | [More info](#validatefeaturecollection) |
| `validateGeometryTypes`     | `types: string \| string [], geom: AllTypes`  | [More info](#validategeometrytypes)     |

### validate

Supports [all geometry types](#types).

**Example:**

```js
import { validate } from 'geojsonjs';
const result = validate(geom);

// TypeScript
import { validate, ValidationResult } from 'geojsonjs';
const result: ValidationResult = validate(geom);
```

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
  - [Geometry collection](#geometry-collection)
  - [Geometry collections (array)](#geometry-collections-array)
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

### Geometry Collection

```json
{
  "type": "GeometryCollection",
  "geometries": [
    { "type": "Point", "coordinates": [11, 22] },
    {
      "type": "LineString",
      "coordinates": [
        [11, 22],
        [22, 33]
      ]
    }
  ]
}
```

### Geometry Collections (array)

```json
[
  {
    "type": "GeometryCollection",
    "geometries": [{ "type": "Point", "coordinates": [11, 22] }]
  },
  {
    "type": "GeometryCollection",
    "geometries": [
      {
        "type": "LineString",
        "coordinates": [
          [11, 22],
          [22, 33]
        ]
      }
    ]
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

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request. For more information, see the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).

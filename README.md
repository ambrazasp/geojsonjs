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

## Documentation

Documentation can be found [here](/docs/readme.md) 

### Validation

| Name                        | Params                                        |                                           |
| --------------------------- | --------------------------------------------- | ----------------------------------------- |
| `validateCoordinates`       | `type: string, coordinates: CoordinatesTypes` | [More info](#validate-coordinates)        |
| `validateGeometry`          | `geom: Geometry`                              | [More info](#validate-geometry)           |
| `validateFeature`           | `feature: Feature`                            | [More info](#validate-feature)            |
| `validateFeatures`          | `features: Feature[]`                         | [More info](#validate-features)           |
| `validateFeatureCollection` | `collection: FeatureCollection`               | [More info](#validate-feature-collection) |

Each validation returns
[ValidationResult](#validation-result) response

#### Validate Coordinates

Example:

```js
const valid = validateCoordinates('Point', [11, 12]);
```

#### Validate Geometry

Example:

```js
const valid = validateGeometry({
  type: 'Point',
  coordinates: [11, 22],
});
```

#### Validate Feature

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

#### Validate Features

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

#### Validate Feature Collection

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

#### `ValidationResult`<a id='validation-result'></a>

Type, that consists of:

```js
{
  valid: true | false,
  error?: 'VALIDATION_ERROR',
  data?: GenericObject | null // only for error
}
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request. For more information, see the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).

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

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request. For more information, see the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).

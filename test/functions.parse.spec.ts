import { parse } from '../src/functions';
import { FeatureCollection } from '../src/types';

const geometryCollection = {
  type: 'GeometryCollection',
  geometries: [
    { type: 'Point', coordinates: [11, 22] },
    {
      type: 'LineString',
      coordinates: [
        [11, 22],
        [22, 33],
      ],
    },
  ],
};

describe('parsing', () => {
  it('parses geometry collection', () => {
    const result: FeatureCollection = parse(geometryCollection);
    expect(result.features.length).toEqual(2);
    expect(result.features[0].geometry.coordinates).toEqual(geometryCollection.geometries[0].coordinates);
    expect(result.features[1].geometry.coordinates).toEqual(geometryCollection.geometries[1].coordinates);
  });
});

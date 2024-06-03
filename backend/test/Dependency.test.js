import Dependency from '../program/Dependency.js'

describe('Dependency class tests', () => {
    test('should create an instance with uppercase determinant and dependent', () => {
        const x = ['a'];
        const y = ['b'];
        const dependency = new Dependency(x, y);
        expect(dependency.x).toEqual(['A']);
        expect(dependency.y).toEqual(['B']);
    });

    test('should throw an error if x or y are not provided', () => {
        expect(() => new Dependency()).toThrow('Both x and y arrays must be provided');
    });

    test('should handle multiple elements correctly', () => {
        const x = ['a', 'c'];
        const y = ['b', 'd'];
        const dependency = new Dependency(x, y);
        expect(dependency.toString()).toBe('AC → BD');
    });
});

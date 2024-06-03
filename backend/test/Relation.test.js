import Relation from '../program/Relation.js'

describe('Relation class tests', () => {
    test('should create an instance with uppercase attributes', () => {
        const attributes = ['a', 'b', 'c'];
        const relation = new Relation(attributes);
        expect(relation.attributes).toEqual(['A', 'B', 'C']);
    });

    test('should throw error if attributes are not provided', () => {
        expect(() => new Relation()).toThrow('The set of attributes must be provided');
    });

    test('should throw error if attributes are not an array', () => {
        expect(() => new Relation('abc')).toThrow('Array of symbols must be given');
    });

    test('should throw error if any attribute is not a single letter string', () => {
        expect(() => new Relation(['A1', 'B', 'C'])).toThrow('Every element has to be a string letter');
    });

    test('should correctly set and get quasikey and dependencies', () => {
        const relation = new Relation(['a', 'b']);
        relation.setQuasikey(['A']);
        relation.setDeps(['A → B']);
        expect(relation.getQuasikey()).toEqual(['A']);
        expect(relation.getDeps()).toEqual(['A → B']);
    });
});

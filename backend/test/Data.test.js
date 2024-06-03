import Data from '../program/Data.js'
import Relation from '../program/Relation.js'
import Dependency from '../program/Dependency.js'

describe('Data class tests', () => {
    test('should aggregate relations and dependencies', () => {
        const relations = [new Relation(['a']), new Relation(['b'])];
        const dependencies = [new Dependency(['a'], ['b']), new Dependency(['b'], ['a'])];
        const data = new Data(relations, dependencies);
        expect(data.relations.length).toBe(2);
        expect(data.dependencies.length).toBe(2);
        expect(data.relations[0].attributes).toEqual(['A']);
        expect(data.dependencies[0].toString()).toBe('A → B');
    });
});
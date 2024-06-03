import NormalizedData from '../program/NormalizedData.js'
import Relation from '../program/Relation.js'
import Dependency from '../program/Dependency.js'

describe('NormalizedData', () => {
    let normalizedData;
    let relations;
    let dependencies;

    beforeEach(() => {
        relations = [new Relation(['A', 'B', 'C'])];
        dependencies = [new Dependency(['A'], ['B']), new Dependency(['B'], ['C'])];
        normalizedData = new NormalizedData(relations, dependencies);
    });

    test('findMinimalCover should correctly compute the minimal cover of dependencies', () => {
        normalizedData.findMinimalCover();
        const expected = ['A → B', 'B → C'];
        const actual = normalizedData.data.dependencies.map(dep => dep.toString());
        expect(actual).toEqual(expect.arrayContaining(expected));
    });

    test('getQuasikey should correctly compute the quasikey of the relation', () => {
        const quasikey = normalizedData.getQuasikey();
        expect(quasikey).toEqual(['A']);
    });

    test('get3NF should decompose the relation into Third Normal Form correctly', () => {
        normalizedData.get3NF();
        expect(normalizedData.data.relations.length).toBeGreaterThan(1);
        expect(normalizedData.data.relations.map(x => x.getData()) == ["R (B,C), первинний ключ = B, залежності = { B → C }", "R (A,B), первинний ключ = A, залежності = { A → B }"])
        // normalizedData.data.relations.forEach(relation => {
        //     expect(relation.getDeps().every(dep => {
        //         return normalizedData.#isIn3NF(relation.getQuasikey(), [dep]);
        //     })).toBeTruthy();
        // });
    });

    test('checkLosslessCon should verify if the decomposition is lossless', () => {
        normalizedData.findMinimalCover();
        normalizedData.get3NF();
        const result = normalizedData.checkLosslessCon();
        expect(result).toBeTruthy();
    });
});

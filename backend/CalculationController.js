import NormalizedData from "./program/NormalizedData.js"
import Dependency from "./program/Dependency.js"
import Relation from "./program/Relation.js"

class CalculationController {
    async calculateMinimalFDs(req, res) {
        try {
            const data = req.body
            const rel = data.attributes
            const fdxs = data.xs
            const fdys = data.ys
            
            const relation = new Relation(rel)
            const relations = new Array(relation)
            const deps = []

            for (let i = 0; i < fdxs.length; i++) {
                deps.push(new Dependency(fdxs[i], fdys[i]))
            }

            const nd = new NormalizedData(relations, deps)
            nd.findMinimalCover()
            const result = nd.data.dependencies.map(i => i.toString()).toString()
            console.log(result)
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async calculate3NF(req, res) {
        try {
            const data = req.body
            const rel = data.attributes
            const fdxs = data.xs
            const fdys = data.ys
            
            const relation = new Relation(rel)
            const relations = new Array(relation)
            const deps = []

            for (let i = 0; i < fdxs.length; i++) {
                deps.push(new Dependency(fdxs[i], fdys[i]))
            }

            const nd = new NormalizedData(relations, deps)
            nd.findMinimalCover()
            nd.get3NF()
            let result = []
            for (const res of nd.data.relations) {
                result.push(res.getData())
            }
            console.log(result)
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async checkLossless(req, res) {
        try {
            const data = req.body
            const rel = data.attributes
            const fdxs = data.xs
            const fdys = data.ys
            
            const relation = new Relation(rel)
            const relations = new Array(relation)
            const deps = []

            for (let i = 0; i < fdxs.length; i++) {
                deps.push(new Dependency(fdxs[i], fdys[i]))
            }

            const nd = new NormalizedData(relations, deps)
            nd.findMinimalCover()
            nd.get3NF()
            let result = nd.checkLosslessCon()
            console.log(result)
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async checkDepsPreserving(req, res) {
        try {
            const data = req.body
            const rel = data.attributes
            const fdxs = data.xs
            const fdys = data.ys
            
            const relation = new Relation(rel)
            const relations = new Array(relation)
            const deps = []

            for (let i = 0; i < fdxs.length; i++) {
                deps.push(new Dependency(fdxs[i], fdys[i]))
            }

            const nd = new NormalizedData(relations, deps)
            nd.findMinimalCover()
            nd.get3NF()
            let result = nd.checkDepsPreserving()
            result.minimalCover = result.minimalCover.map(i => i.toString()).toString()
            console.log(result.relationObjects[0].getQuasikey())
            result.relationObjects = result.relationObjects.map(i => new Object({attributes: i.attributes, quasikey: i.getQuasikey(), deps: i.getDeps().toString()}))
            console.log(result.relationObjects)
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

export default CalculationController;
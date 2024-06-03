import Dependency from "./Dependency.js"
import Relation from "./Relation.js"
import util from 'util'

class Data {
    constructor (relations, dependencies) {
        this.relations = []
        for (const relation of relations) {
            this.relations.push(relation)
        }

        this.dependencies = []
        for (const dependence of dependencies) {
            this.dependencies.push(dependence)
        }
    }

    [util.inspect.custom](depth, opts) {
        let result = "Relations:\n"
        result += this.relations.map((relation) => util.inspect(relation, opts)).join('\n')
        result += "\nDependencies:\n"
        result += this.dependencies.map((dependence) => util.inspect(dependence, opts)).join('\n')
        result += "\n"
        return result
    }
}

export default Data;
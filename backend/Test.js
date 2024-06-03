import Dependency from "./program/Dependency.js"
import Relation from "./program/Relation.js"
import NormalizedData from "./program/NormalizedData.js"

const dep = new Dependency(["A", "B"], ["C"])
// console.log(dep)

const dep1 = new Dependency(["A", "B", "d"], ["C", "E"])
// console.log(dep1)

// const depError = new Dependency("fff", 323)

const rel = new Relation(["a", "b", "c", "d"])
// console.log(rel)

// const relError = new Relation(["dd", "e", "www"])

const relations = [["a", "b", "c", "d"]]
const relations1 = [["a", "b", "c", "d", "e"]]
const relations2 = [["a", "b", "c", "d", "e", "f", "g", "h", "I"]]
const relations3 = [["c", "t", "h", "r", "s", "g"]]
const relations4 = [["a", "b", "c", "d", "e", "f"]]

const dependencies = [
    [["a"], ["c", "d"]],
    [["b"], ["c"]],
    [["b", "d"], ["c"]]
]

const dependencies1 = [
    [["a"], ["c"]],
    [["c"], ["d"]],
    [["b"], ["c"]],
    [["d", "e"], ["c"]],
    [["c", "e"], ["a"]]
]

const dependencies2 = [
    [["b"], ["a", "c", "d"]],
    [["a"], ["b", "c", "d"]],
    [["f"], ["e", "g", "b", "a", "c", "d"]],
    [["h"], ["i"]]
]

const dependencies3 = [
    [["c", "S"], ["g"]],
    [["c"], ["t"]],
    [["c", "H"], ["r"]],
    [["h", "S"], ["c"]],
    [["h", "s"], ["r"]]
]

const dependencies4 = [
    [["a"], ["b"]],
    [["c"], ["d", "a", "e", "b", "f"]],
    [["e"], ["f"]]
]

const testRel = relations
const testDeps = dependencies
const rels = []
for (let i = 0; i < testRel.length; i++) {
    if (Array.isArray(testRel[i])) rels.push(new Relation(testRel[i]))
}
const depss = []
for (let i = 0; i < testDeps.length; i++) {
    if (Array.isArray(testDeps[i])) depss.push(new Dependency(testDeps[i][0], testDeps[i][1]))
}
console.log(depss)

const nrm = new NormalizedData(rels, depss)
console.log(nrm.data)
nrm.findMinimalCover()
console.log("Minimal cover: ")
console.log(nrm.data)
nrm.get3NF()
console.log(nrm.checkDepsPreserving().solution)
import Data from "./Data.js"
import Dependency from "./Dependency.js"
import util from 'util'
import Relation from "./Relation.js"

class NormalizedData {
    #changedLeft = false
    #quasikey = null
    #allAttrs = null
    constructor (relations, dependencies) {
        this.data = new Data(relations, dependencies);
    }

    findMinimalCover() {
        this.#singleAttributeRightPart()
        this.data.dependencies = this.#removeDuplicates(this.data.dependencies)
        this.#removingRedundantDeps()
        this.#removingRedundantLeftDeps()
        while (this.#changedLeft) {
            this.#removingRedundantDeps()
            this.#changedLeft = this.#checkMultipleLefts(this.data.dependencies)
            if (this.#changedLeft) this.#removingRedundantLeftDeps()
        }   
    }

    getQuasikey() {
        let candidates = this.#getAllAttrs().slice()
        const allAttrs = this.#getAllAttrs().slice()
        this.#allAttrs = [...allAttrs]
        for (const dep of this.data.dependencies) {
            for (const y of dep.y) {
                if (candidates.includes(y)) candidates.splice(candidates.indexOf(y), 1)
            }
        }

        let combos = this.#getAllCombos(candidates)
        let quasikey = null
        for (const key of combos) {
            const cl = this.#closure(new Dependency(key, allAttrs), this.data.dependencies)
            if (cl.sort().toString() === allAttrs.sort().toString()) {
                quasikey = key
                break
            }
        }
        return quasikey
    }

    get3NF() {
        const minimalCover = this.data.dependencies;
        const attributes = this.#getAllAttrs();
        const quasikey = this.getQuasikey();

        console.log("Minimal Cover:", minimalCover);
        console.log("Attributes:", attributes);
        console.log("Quasikey:", quasikey);

        if (!quasikey) {
            console.log("Error: Quasikey not found.");
            return;
        }

        const relations3NF = this.#decomposeTo3NF(minimalCover, attributes, quasikey);
        console.log("Relations in 3NF:", relations3NF);
        this.data.relations = relations3NF
        console.log(this.data.relations[0].getData())
    }

    #decomposeTo3NF(deps, attrs, quasikey) {
        let relations = []
        console.log(attrs)
        console.log(deps)
        console.log(quasikey)
        const rel = new Relation(attrs)
        rel.setDeps(deps)
        rel.setQuasikey(quasikey)
        if (deps.length == 0) {
            relations.push(rel)
            console.log("")
            return relations
        } else {
            if (deps.length == 1) {
                if (this.#isIn2NF(quasikey, deps)) {
                    relations.push(rel)
                    console.log("")
                    return relations
                } else {
                    const newAttrs = attrs.filter( i => !deps[0].y.includes(i))
                    if (!this.#checkHeathTheorem(quasikey, deps[0])) {
                        console.log("bb")
                        console.log("")
                        return null
                    }
                    console.log("here is ", deps[0])
                    console.log("")
                    relations.push(this.#decomposeTo3NF([deps[0]], deps[0].x.concat(deps[0].y), deps[0].x))
                    relations.push(this.#decomposeTo3NF([], newAttrs, quasikey))
                    relations = relations.flat(1)
                }
            } else {
                if (this.#isIn2NF(quasikey, deps) && this.#isIn3NF(quasikey, deps)) {
                    console.log("")
                    relations.push(rel)
                    return relations
                } else {
                    for (const dep of deps) {
                        relations = []
                        let newDeps = deps.slice().filter( i => !i.x.sort().join('').includes(dep.y.sort().join('')) && !i.y.sort().join('').includes(dep.y.sort().join('')))
                        const newAttrs = attrs.filter( i => !dep.y.includes(i))
                        console.log("current dep: ", dep)
                        console.log("deps: ", deps)

                        const depsWithoutTransitivity = this.#removeTransitiveDependencies(deps.slice()).filter( i => !i.x.sort().join('').includes(dep.y.sort().join('')) && !i.y.sort().join('').includes(dep.y.sort().join('')))
                        console.log(depsWithoutTransitivity, " trans and del ", newDeps)
                        if (newDeps.length == 0 && depsWithoutTransitivity.length > 0) {
                            console.log("F")
                            continue
                        }

                        console.log("heath checked theorem: ", dep)
                        console.log("")
                        if (!this.#checkHeathTheorem(quasikey, dep)) {
                            console.log("gg")
                            continue
                        }
                        const oneBranch = this.#decomposeTo3NF([dep], dep.x.concat(dep.y), dep.x)
                        const multiBranch = this.#decomposeTo3NF(newDeps, newAttrs, quasikey)
                        console.log("with dep ", dep, " in ", deps, " we have relation ", oneBranch, " and muliple", multiBranch)
                        if (oneBranch.includes(null) || !multiBranch) continue
                        relations.push(oneBranch)
                        relations.push(multiBranch)
                        relations = relations.flat(1)
                        break
                    }
                }
            }
        }
        return relations
    }

    #isIn2NF(quasikey, deps) {
        for (const dep of deps) {
            if (quasikey.sort().join('').includes(dep.x.sort().join('')) && dep.x.sort().join('') != quasikey.sort().join('')) return false
        }
        return true
    }

    #isIn3NF(quasikey, deps) {
        for (const dep of deps) {
            if (dep.x.sort().join('') != quasikey.sort().join('')) return false
        }
        return true
    }

    #checkHeathTheorem(quasikey, dep) {
        console.log(dep.y.sort().join(''), " ⊈ ",  dep.x.sort().join(''), "; ", quasikey.sort().join(''), " ⊈ ", dep.x.sort().join(''))
        return !dep.x.sort().join('').includes(dep.y.sort().join('')) && !dep.x.sort().join('').includes(quasikey.sort().join(''))
    }

    #removeTransitiveDependencies(deps) {
        let i = 0
        while (i < deps.length) {
            let first = 0
            let second = 0
            for (let j = 0; j < deps.length; j++) {
                if (deps[i].y.sort().join('') === deps[j].x.sort().join('')) {
                    first = i
                    second = j
                    break
                } else if (deps[i].x.sort().join('') === deps[j].y.sort().join('')) {
                    first = j
                    second = i
                    break
                }
            }
            if (first != 0 && second != 0) {
                deps[first] = new Dependency(deps[first].x, deps[second].y)
                deps.splice(second, 1)
                break
            }
            i++
        }
        return deps
    }
    

    #singleAttributeRightPart() {
        const updatedDeps = []
        for (const dep of this.data.dependencies) {
            if (dep.y.length > 1) {
                for (const attr of dep.y) {
                    updatedDeps.push(new Dependency(dep.x, [attr]))
                }
            } else {
                updatedDeps.push(dep)
            }
        }
        this.data.dependencies = updatedDeps
    }

    #removingRedundantDeps() {
        let i = 0;
        while (i < this.data.dependencies.length) {
            const dep = this.data.dependencies[i]
            if (this.#closure(dep, this.data.dependencies.filter((_, index) => index !== i)).toString().includes(dep.y.toString())) {
                this.data.dependencies.splice(i, 1)
            } else {
                i++
            }
        }
    }

    #removingRedundantLeftDeps() {
        this.#changedLeft = false
        for (let i = 0; i < this.data.dependencies.length; i++) {
            const dep = this.data.dependencies[i]
            if (dep.x.length > 1) {
                for (let j = 0; j < dep.x.length; j++) {
                    const newX = [...dep.x.slice(0, j), ...dep.x.slice(j + 1)];
                    const newDep = new Dependency(newX, dep.y)
                    const newDeps = this.data.dependencies.slice()
                    newDeps[i] = newDep
                    if (
                        this.#closure(dep, newDeps).sort().toString().includes(dep.y.sort().toString()) &&
                        this.#closure(newDep, this.data.dependencies).sort().toString().includes(newDep.y.sort().toString()) &&
                        (!(dep.x === newDep.x) || !(dep.y === newDep.y))
                    ) {
                        this.data.dependencies[i] = newDep
                        this.#changedLeft = true
                        break
                    }
                }
            }
        }
    }
    
    
    

    #closure(dep, deps) {
        const closure = new Set(dep.x);
        let changed = true;
        while (changed) {
            changed = false;
            for (const d of deps) {
                if (d.x.every(attr => closure.has(attr))) {
                    for (const attr of d.y) {
                        if (!closure.has(attr)) {
                            closure.add(attr);
                            changed = true;
                        }
                    }
                }
            }
        }
        return Array.from(closure);
    }

    #checkMultipleLefts(dependencies) {
        for (const dep of dependencies) {
            if (dep.x.length > 1) {
                return true
            }
        }
        return false
    }
    

    #removeDuplicates(dependencies) {
        return dependencies.filter((obj, index, self) =>
            index === self.findIndex((o) =>
                obj.x.every((elem, i) => elem === o.x[i]) &&
                obj.y.every((elem, i) => elem === o.y[i])
            )
        )
    }

    #getAllAttrs() { //use it only before calculating3NF
        let attrs = this.data.relations[0].attributes.slice()
        for (let i = 1; i < this.data.relations.length; i++) {
            attrs.concat(this.data.relations[i].attributes.slice())
        }
        return attrs
    }

    #getAllCombos(items) {
        let combos = []
        for (let i = 1; i <= items.length; i++) { 
            for (let j = 0; j <= items.length - i; j++) {
                combos.push(items.slice(j, j + i))
            } 
        }
        return combos
    }
    
    checkLosslessCon() {
        let test = Array.from(Array(1 + this.data.relations.length), () => new Array(1 + this.#allAttrs.length).fill(0))
        test[0][0] = " "
        for (let i = 1; i <= this.#allAttrs.length; i++) {
            test[0][i] = this.#allAttrs[i - 1]
        }
        for (let i = 1; i <= this.data.relations.length; i++) {
            test[i][0] = "R" + i
        }
        
        for (let i = 1; i < this.data.relations.length + 1; i++) {
            for (let j = 1; j < test[0].length; j++) {
                if (this.data.relations[i - 1] && this.data.relations[i - 1].attributes.includes(test[0][j])) test[i][j] = "a" + j
                else test[i][j] = "b" + i + j
            }
        }

        for (const dep of this.data.dependencies) {
           const j = this.#allAttrs.indexOf(dep.y[0]) + 1
           const js = dep.x.map(i => this.#allAttrs.indexOf(i) + 1)
           let isAs = false
           let as = ""
           for (let k = 1; k < 1 + this.data.relations.length; k++) {
                let is = true
                for (let l = 0; l < js.length; l++) {
                    if (!test[k][js[l]].includes("a")) {
                        is = false
                    }
                }
                if (is && test[k][j] != "a" + j) {
                    test[k][j] = "a" + j + test[k][j]
                }
                as = test[k].filter(item => item.includes("a")).join("");
                as = as.split("").filter(i => i == "a").join("");
                if (as.length == this.#allAttrs.length) isAs = true
            }
            if (isAs) break
        }
            
        return test
    }

    checkDepsPreserving() {
        let solution = []
        const includedDeps = this.data.relations.map(i => i.getDeps()).flat(1)
        const unincludedDeps = this.data.dependencies.filter(i => !includedDeps.includes(i))
        console.log("unincleded ", unincludedDeps)
        for (const dep of unincludedDeps) {
            console.log(dep)
            solution.push({dep: dep.toString(), includedDeps: includedDeps.toString(), unincludedDeps: unincludedDeps.toString(), cover: this.#closure(dep, includedDeps), ifIsCover: this.#closure(dep, includedDeps).includes(dep.y)})
            if (!this.#closure(dep, unincludedDeps)) break
        }
        if (!unincludedDeps || unincludedDeps.length == 0) {
            solution.push({ifIsCover: true, deps: includedDeps.toString()})
        }
        return {minimalCover: this.data.dependencies, relations: this.data.relations.map(i => i.getData()), relationObjects: this.data.relations, solution: solution}
    }
}

export default NormalizedData;

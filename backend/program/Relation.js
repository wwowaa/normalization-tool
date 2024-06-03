import util from 'util'

class Relation {
    #quasikey = null
    #deps = null
    constructor (attributes) {
        if (!attributes) {
            throw new Error("The set of attributes must be provided");
        }
        if (!Array.isArray(attributes) || !attributes.length > 0) {
            throw new Error("Array of symbols must be given");
        }
        if (!this.#checkElements(attributes)) {
            throw new Error("Every element has to be a string letter");
        } else {
            this.attributes = attributes.map( (i) => (i.toUpperCase()));
        }
    }
    

    [util.inspect.custom](depth, opts) {
        let info = "R (" + this.attributes.map( (i) => (i)).join(',') + ")"
        return info
    }

    getData() {
        let info = "R (" + this.attributes.map( (i) => (i)).join(',') + ")"
        if (this.#quasikey) info += ", первинний ключ = " + this.#quasikey.join('')
        if (this.#deps) info += ", залежності = { " + this.#deps.toString() + " }"
        return info
    }

    getDeps() {
        return this.#deps
    }

    getQuasikey() {
        return this.#quasikey
    }

    setQuasikey(quasikey) {
        this.#quasikey = quasikey
    }

    setDeps(deps) {
        this.#deps = deps
        console.log(this.#deps)
    }

    #checkElements(arr) {
        for (const i of arr) {
            if (typeof i !== 'string' || i.length != 1) {
                return false;
            }
            if (!i.match(/^[a-zA-Z]+$/)) {
                return false;
            }
        }
        return true;
    }
}

export default Relation;
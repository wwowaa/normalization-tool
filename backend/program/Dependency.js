import util from 'util'

class Dependency {
    constructor (x, y) {
        if (!x || !y) {
            throw new Error("Both x and y arrays must be provided");
        }
        if (!Array.isArray(x) || !x.length > 0) {
            throw new Error("Array of symbols must be given for determinant");
        }
        if (!Array.isArray(y) || !y.length > 0) {
            throw new Error("Array of strings must be given for dependence");
        }
        if (!this.#checkElements(x) || !this.#checkElements(y)) {
            throw new Error("Every element has to be a string letter");
        } else {
            this.x = x.map((i) => (i.toUpperCase()));
            this.y = y.map((i) => (i.toUpperCase()));
        }
    }
    
    [util.inspect.custom](depth, opts) {
        return this.x.map( (i) => (i)).join('') + " → " + this.y.map( (i) => (i)).join('')
    }

    toString() {
        return this.x.map( (i) => (i)).join('') + " → " + this.y.map( (i) => (i)).join('')
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

export default Dependency;
import Heap from './heaps.js';

class HashedPQ {
    constructor({arr = [], op = 'min'}) {
        
        const weightMap = {};
        const keyMap = {};
        const heap = new Heap({arr: arr.map(obj => obj.weight), op: op});

        function insertWeightMap(obj) {
            if (obj.weight in weightMap) {
                weightMap[obj.weight].push(obj);
            } else {
                weightMap[obj.weight] = [obj];
            }
        }

        function removeWeightMap(weight, key) {
            const arr = weightMap[weight];
            if (key === undefined) {
                return arr.shift();
            } else {
                for (let i = 0; i < arr.length; ++i) {
                    if (arr[i].key === key) {
                        return arr.splice(i, 1)[0];
                    }
                }
            }
            return null;
        }

        function insertKeyMap(obj) {
            keyMap[obj.key] = obj;
        }

        function removeKeyMap(key) {
            delete keyMap[key];
        }

        for (const obj of arr) {
            insertWeightMap(obj);
            insertKeyMap(obj);
        }

        this.insert = function(obj) {
            insertWeightMap(obj);
            insertKeyMap(obj);
            heap.insert(obj.weight);
        }

        this.remove = function(e, key) {
            if (key !== undefined) {
                const obj = keyMap[key];
                if (!obj) {
                    return null;
                } else {
                    heap.remove(obj.weight);
                    removeWeightMap(obj.weight, obj.key);
                    removeKeyMap(key);
                    return obj;
                }
            } else {
                const weight = e === undefined ? heap.remove() : heap.remove(e);
                if (weight === null) {
                    return null;
                } else {
                    const obj = removeWeightMap(weight);
                    removeKeyMap(obj.key);
                    return obj;
                }
            }
        }

        this.has = key => {
            return key in keyMap;
        }

        this.get = key => {
            return key in keyMap ? keyMap[key] : null;
        }

        this.peek = () => heap.size() > 0 ? map[heap.peek()][0] : null;

        this.size = () => heap.size();
        
        this.print = () => {
            console.log('map');
            console.log(weightMap);
            console.log('table');
            console.log(keyMap);
        }
    }
}

export default HashedPQ;
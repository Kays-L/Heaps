import Heap from './heaps.js'

class PriorityQueue {
    constructor({arr = [], op = 'min', comparator = null}) {
        
        const map = {};
        const heap = new Heap({arr: arr.map(obj => obj.weight), op: op, comparator: comparator});

        function updateMap(obj) {
            if (obj.weight in map) {
                map[obj.weight].push(obj);
            } else {
                map[obj.weight] = [obj];
            }
        }

        for (const obj of arr) {
            updateMap(obj);
        }

        this.insert = function(obj) {
            updateMap(obj);
            heap.insert(obj.weight);
        }

        this.remove = function(e) {
            const res = e === undefined ? heap.remove() : heap.remove(e.weight);
            return res === null ? null : map[res].shift();
        }

        this.peek = () => heap.size() > 0 ? map[heap.peek()][0] : null;

        this.size = () => heap.size();
    }
}

export default PriorityQueue;
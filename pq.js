import Heap from './heaps.js'

class PriorityQueue {
    constructor({arr = [], op = 'min', comparator = null}) {
        
        const map = {};
        const heap = new Heap(arr.map(obj => obj.weight), op, comparator);

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
            const res = heap.remove(e);
            return res === undefined ? undefined : map[res].shift();
        }

        this.peek() = () => heap.peek();

        this.size = () => heap.size();
    }
}

export default PriorityQueue;
class Heap {
    
    //arr: T, op: (T, T) => T
    constructor({arr = [], op = 'min', comparator = null}) {  
        const heap = arr.slice(0, arr.length);
        const min = (a, b) => a < b;
        const max = (a, b) => a > b;
        if (comparator !== null) {
            op = comparator;
        } else {
            op = op === 'min' ? min : max;
        }
        
        function swap(i, j) {
            let temp = heap[i];
            heap[i] = heap[j];
            heap[j] = temp;
        }

        function percolateUp(i) {
            let parent = (i - 1) >> 1;
            while (parent >= 0 && op(heap[i], heap[parent])) {
                swap(i, parent);
                i = parent;
                parent = (i - 1) >> 1;
            }
        }
        
        function percolateDown(i) {
            function getChild(i) {
                let l = (2 * i) + 1;
                let r = (2 * i) + 2;
                if (l < heap.length && r < heap.length) {
                    return op(heap[l], heap[r]) ? l : r;
                } else if (l < heap.length) {
                    return l;
                } else {
                    return i;
                }
            }
            let child = getChild(i);
            while (child !== i && op(heap[child], heap[i])) {
                swap(i, child);
                i = child;
                child = getChild(i);
            }
        }

        function heapify() {
            for (let i = heap.length >> 1 - 1; i >= 0; --i) {
                percolateDown(i);
            }
        }
        
        heapify();

        this.insert = function(e) {
            heap.push(e);
            percolateUp(heap.length - 1);
        }

        this.remove = function(e) {
            if (heap.length <= 0) {
                return null;
            }
            let i = e === undefined ? 0 : heap.indexOf(e);
            if (i === -1) {
                return null;
            } else if (i === heap.length - 1) {
                return heap.pop();
            } else {
                let result = heap[i];
                heap[i] = heap.pop();
                percolateDown(i);
                return result;
            }
        }

        this.peek = () => heap.length <= 0 ? null : heap[0];
        
        this.size = () => heap.length;
    }
}

export default Heap;
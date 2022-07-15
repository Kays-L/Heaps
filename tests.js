import assert from 'assert';
import Heap from './heaps.js';
import * as fs from 'fs';

describe('new Heap()', () => {
    const asc = (a, b) => a <= b ? -1 : 1;
    const desc = (a, b) => a >= b ? -1 : 1;
    
    describe('default heapification', () => {
        let arr;
        let heap;

        before(() => {
            arr = [];
            for (let i = 0; i < Math.floor(Math.random() * 50) + 25; ++i) {
                arr.push(Math.floor(Math.random() * 100));
            }
            heap = new Heap(arr, 'max');
        });

        it('initializes heap to correct default size', () => {
            assert.equal(arr.length, heap.size());
        });

        it ('heapifies input array', () => {
            arr.sort(desc);
            const results = [];
            for (let i = 0; i < 100; ++i) {
                results.push(heap.pop());
            }
            assert.deepEqual(arr, results);
        });
    });

	describe('minHeap insert()', () => {
        let heap;

        beforeEach(() => {
            heap = new Heap({op: 'min'});
        });

		it('increases size of heap by one', () => {
            heap.insert(1);
            assert.equal(heap.size(), 1);
        });

        it('yields correct size after multiple insertions', () => {
            let insertions = Math.floor(Math.random() * 50) + 10;
            for (let i = 0; i < insertions; ++i) {
                heap.insert(i);
            }
            assert.equal(heap.size(), insertions);
        });

        it('it maintains lowest item at root given decreasing stream', () => {
            for (let i = 50; i >= 0; --i) {
                heap.insert(i);
                assert.equal(heap.peek(), i);
            }
        });

        it('it maintains greatest item at root given random stream', () => {
            let min = Infinity;
            for (let i = 0; i <= 50; ++i) {
                let rand = Math.floor(Math.random());
                min = Math.min(min, rand);
                heap.insert(rand);
                assert.equal(heap.peek(), min);
            }
        });
	});

    describe('maxHeap insert()', () => {
        let heap;

        beforeEach(() => {
            heap = new Heap({op: 'max'});
        });

		it('increases size of heap by one', () => {
            heap.insert(1);
            assert.equal(heap.size(), 1);
        });

        it('yields correct size after multiple insertions', () => {
            let insertions = Math.floor(Math.random() * 50) + 10;
            for (let i = 0; i < insertions; ++i) {
                heap.insert(i);
            }
            assert.equal(heap.size(), insertions);
        });

        it('it maintains greatest item at root given increasing stream', () => {
            for (let i = 0; i <= 50; ++i) {
                heap.insert(i);
                assert.equal(heap.peek(), i);
            }
        });

        it('it maintains greatest item at root given random stream', () => {
            let max = -Infinity;
            for (let i = 0; i <= 50; ++i) {
                let rand = Math.floor(Math.random());
                max = Math.max(max, rand);
                heap.insert(rand);
                assert.equal(heap.peek(), max);
            }
        });
	});

	describe.only('empty heap', () => {
        let heap;
        
        before(() => {
            heap = new Heap();
        });

        describe('remove(e)', () => {
            it('returns null', () => {
                let e = Math.floor(Math.random() * 1000000);
                assert.equal(heap.remove(e), null);
            });
        });

        describe('pop()', () => {
            it('returns null', () => {
                assert.equal(heap.pop(), null);
            });
        });

        describe('peek()', () => {
            it('returns null', () => {
                assert.equal(heap.peek(), null);
            });
        });

        describe('size()', () => {
            it ('returns 0', () => {
                assert.equal(heap.size(), 0);
            });
        });
	});
});

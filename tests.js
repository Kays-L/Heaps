import assert from 'assert';
import Heap from './heaps.js';
import PriorityQueue from './pq.js';

describe('new Heap()', () => {
	const asc = (a, b) => (a <= b ? -1 : 1);
	const desc = (a, b) => (a >= b ? -1 : 1);

	function emptyTests(heap) {
		assert.equal(heap.size(), 0);
		assert.equal(heap.peek(), null);
		assert.equal(heap.remove(), null);
		assert.equal(heap.remove(Math.floor(Math.random() * 100)), null);
	}

	describe('default heapification', () => {
		let arr;
		let heap;

		before(() => {
			arr = [];
			for (let i = 0; i < Math.floor(Math.random() * 50) + 25; ++i) {
				arr.push(Math.floor(Math.random() * 100));
			}
			heap = new Heap({ arr: arr, op: 'max' });
		});

		it('initializes heap to correct default size', () => {
			assert.equal(arr.length, heap.size());
		});

		it('heapifies input array', () => {
			arr.sort(desc);
			const results = [];
			for (let i = 0; i < arr.length; ++i) {
				results.push(heap.remove());
			}
			assert.deepEqual(arr, results);
		});

		it('is empty after previous test', () => {
			emptyTests(heap);
		});
	});

	describe('minHeap insert()', () => {
		let heap;

		beforeEach(() => {
			heap = new Heap({ op: 'min' });
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

		it('it maintains lowest item at root given random stream', () => {
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
			heap = new Heap({ op: 'max' });
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

	describe('empty heap', () => {
		let heap;

		before(() => {
			heap = new Heap({});
		});

		describe('remove(e)', () => {
			it('returns null', () => {
				let e = Math.floor(Math.random() * 1000000);
				assert.equal(heap.remove(e), null);
			});
		});

		describe('remove()', () => {
			it('returns null', () => {
				assert.equal(heap.remove(), null);
			});
		});

		describe('peek()', () => {
			it('returns null', () => {
				assert.equal(heap.peek(), null);
			});
		});

		describe('size()', () => {
			it('returns 0', () => {
				assert.equal(heap.size(), 0);
			});
		});
	});

	describe('minHeap remove(e)', () => {
		let heaps;
		let arrs;

		beforeEach(() => {
			(heaps = []), (arrs = []);
			for (let i = 0; i < 7; ++i) {
				const arr = new Array(i);
				arrs.push(arr);
				for (let j = 0; j < i; ++j) {
					arr[j] = Math.floor(Math.random() * 1000);
				}
				heaps.push(new Heap({ arr: arr, op: 'min' }));
			}
		});

		it('returns null when argument e is not in heaps of different sizes', () => {
			for (let i = 0; i < heaps.length; ++i) {
				assert.equal(heaps[i].remove(Math.floor(Math.random() * 10000) + 1000), null);
			}
		});

		it('removes all items from heaps of different sizes correctly', () => {
			for (let i = 0; i < heaps.length; ++i) {
				for (let j = 0; j < arrs[i].length; ++j) {
					assert.equal(heaps[i].remove(arrs[i][j]), arrs[i][j]);
				}
			}
			for (const heap of heaps) {
				emptyTests(heap);
			}
		});

		it('removes min every time', () => {
			for (let i = 0; i < heaps.length; ++i) {
				let runningMin = -Infinity;
				for (let j = 0; j < arrs[i].length; ++j) {
					let cur = heaps[i].remove();
					assert.ok(cur >= runningMin);
					runningMin = cur;
				}
			}
			for (const heap of heaps) {
				emptyTests(heap);
			}
		});
	});
});

describe('new PriorityQueue()', () => {
	const asc = (a, b) => (a.weight <= b.weight ? -1 : 1);
	const desc = (a, b) => (a.weight >= b.weight ? -1 : 1);

	function emptyTests(pq) {
		assert.equal(pq.size(), 0);
		assert.equal(pq.peek(), null);
		assert.equal(pq.remove(), null);
		assert.equal(pq.remove(pqobj(Math.floor(Math.random() * 100))), null);
	}

    function pqobj(weight) {
        return { weight };
    }

	describe('default heapification', () => {
		let arr;
		let pq;

		before(() => {
			arr = [];
			for (let i = 0; i < Math.floor(Math.random() * 50) + 25; ++i) {
				arr.push(pqobj(Math.floor(Math.random() * 100)));
			}
			pq = new PriorityQueue({ arr: arr, op: 'max' });
		});

		it('initializes pq to correct default size', () => {
			assert.equal(arr.length, pq.size());
		});

		it('heapifies input array', () => {
			arr.sort(desc);
			const results = [];
			for (let i = 0; i < arr.length; ++i) {
				results.push(pq.remove());
			}
			assert.deepEqual(arr, results);
		});

		it('is empty after previous test', () => {
			emptyTests(pq);
		});
	});

	describe('minpq insert()', () => {
		let pq;

		beforeEach(() => {
			pq = new PriorityQueue({ op: 'min' });
		});

		it('increases size of pq by one', () => {
			pq.insert(1);
			assert.equal(pq.size(), 1);
		});

		it('yields correct size after multiple insertions', () => {
			let insertions = Math.floor(Math.random() * 50) + 10;
			for (let i = 0; i < insertions; ++i) {
				pq.insert(i);
			}
			assert.equal(pq.size(), insertions);
		});

		it('it maintains lowest item at root given decreasing stream', () => {
			for (let i = 50; i >= 0; --i) {
				pq.insert(pqobj(i));
				assert.equal(pq.peek().weight, i);
			}
		});

		it('it maintains lowest item at root given random stream', () => {
			let min = Infinity;
			for (let i = 0; i <= 50; ++i) {
				let rand = Math.floor(Math.random());
				min = Math.min(min, rand);
				pq.insert(pqobj(rand));
				assert.equal(pq.peek().weight, min);
			}
		});
	});

	describe('maxpq insert()', () => {
		let pq;

		beforeEach(() => {
			pq = new PriorityQueue({ op: 'max' });
		});

		it('increases size of pq by one', () => {
			pq.insert(1);
			assert.equal(pq.size(), 1);
		});

		it('yields correct size after multiple insertions', () => {
			let insertions = Math.floor(Math.random() * 50) + 10;
			for (let i = 0; i < insertions; ++i) {
				pq.insert(i);
			}
			assert.equal(pq.size(), insertions);
		});

		it('it maintains greatest item at root given increasing stream', () => {
			for (let i = 0; i <= 50; ++i) {
				pq.insert(pqobj(i));
				assert.equal(pq.peek().weight, i);
			}
		});

		it('it maintains greatest item at root given random stream', () => {
			let max = -Infinity;
			for (let i = 0; i <= 50; ++i) {
				let rand = Math.floor(Math.random());
				max = Math.max(max, rand);
				pq.insert(pqobj(rand));
				assert.equal(pq.peek().weight, max);
			}
		});
	});

	describe('empty pq', () => {
		let pq;

		before(() => {
			pq = new PriorityQueue({});
		});

		describe('remove(e)', () => {
			it('returns null', () => {
				let obj = pqobj(Math.floor(Math.random() * 1000000));
				assert.equal(pq.remove(obj), null);
			});
		});

		describe('remove()', () => {
			it('returns null', () => {
				assert.equal(pq.remove(), null);
			});
		});

		describe('peek()', () => {
			it('returns null', () => {
				assert.equal(pq.peek(), null);
			});
		});

		describe('size()', () => {
			it('returns 0', () => {
				assert.equal(pq.size(), 0);
			});
		});
	});

	describe('minpq remove(e)', () => {
		let pqs;
		let arrs;

		beforeEach(() => {
			(pqs = []), (arrs = []);
			for (let i = 0; i < 7; ++i) {
				const arr = new Array(i);
				arrs.push(arr);
				for (let j = 0; j < i; ++j) {
					arr[j] = pqobj(Math.floor(Math.random() * 1000));
				}
				pqs.push(new PriorityQueue({ arr: arr, op: 'min' }));
			}
		});

		it('returns null when argument e is not in pqs of different sizes', () => {
			for (let i = 0; i < pqs.length; ++i) {
				assert.equal(pqs[i].remove(pqobj(Math.floor(Math.random() * 10000) + 1000)), null);
			}
		});

		it('removes all items from pqs of different sizes correctly', () => {
			for (let i = 0; i < pqs.length; ++i) {
				for (let j = 0; j < arrs[i].length; ++j) {
					assert.equal(pqs[i].remove(arrs[i][j]), arrs[i][j]);
				}
			}
			for (const pq of pqs) {
				emptyTests(pq);
			}
		});

		it('removes min every time', () => {
			for (let i = 0; i < pqs.length; ++i) {
				let runningMin = -Infinity;
				for (let j = 0; j < arrs[i].length; ++j) {
					let cur = pqs[i].remove().weight;
					assert.ok(cur >= runningMin);
					runningMin = cur;
				}
			}
			for (const pq of pqs) {
				emptyTests(pq);
			}
		});
	});
});

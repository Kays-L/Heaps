import Heap from './heaps';
import PriorityQueue from './pq.js';

function minCostConnectPoints(points) {
	function pqWrapper(i, to, from) {
		let weight = Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
		return {
			index: i,
			weight: weight
		};
	}
	let min = 0;
	const pq = new PriorityQueue({ op: 'min' });
	const visited = new Array(points.length).fill(false);
	pq.insert(pqWrapper(0, points[0], points[0]));
	for (let i = 0; i < points.length; ++i) {
		let obj = pq.remove();
		while (visited[obj.index]) {
			obj = pq.remove();
		}
		visited[obj.index] = true;
		min += obj.weight;
		for (let j = 0; j < points.length; ++j) {
			if (!visited[j]) {
				pq.insert(pqWrapper(j, points[j], points[obj.index]));
			}
		}
	}
	return min;
}

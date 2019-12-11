import { getUnvisitedNeighBors, updateNodeWalls} from './Dijkstra';

export const breadthFirstSearch = (nodes, start, end) => {
    let queue = [start];
    if (!start || !end || start === end) return false;
    start.distance = 0;
    let visited = [];
    let nodeVisited = new Set(); // 
    while (queue.length) {

        let closest = queue.shift();
        if (nodeVisited.has(closest)) continue;
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        closest.distance = 1;
        nodeVisited.add(closest);
        if (closest.distance === end.distance) return visited;
        updateBreadthFirstSearchNeighbors(closest, nodes);
        let neighbors = getUnvisitedNeighBors(closest, nodes);
        queue.push(...neighbors);
    }
}

function updateBreadthFirstSearchNeighbors(node, nodes) {
    const unvisited = getUnvisitedNeighBors(node, nodes);
    for (let i = 0; i < unvisited.length; i++) {
        let neighbor = unvisited[i];
        neighbor.distance = node.distance = 1;
        neighbor.previous = node;
    }
}
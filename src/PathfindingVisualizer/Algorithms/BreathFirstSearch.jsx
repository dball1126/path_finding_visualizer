import { getAllNodes, getUnvisitedNeighBors} from './Dijkstra';

export const breadthFirstSearch = (nodes, start, end) => {
    let queue = [ start ];
    let unvisited = getAllNodes(nodes);
    if (!start || !end || start === end) return false;
    start.distance = 0;

    while (unvisited.length > 0) {
        let closest = queue.shift();
        
        let closest = unvisited.shift();
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        if (closest.distance === end.distance) return visited;
        updateBreadthFirstSearchNeighbors(closest, nodes);

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
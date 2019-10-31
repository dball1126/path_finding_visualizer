export const depthFirstSearch = (nodes, start, end) => {
    debugger
    let queue = [start];
    if (!start || !end || start === end) return false;
    start.distance = 0;
    let visited = [];
    let nodeVisited = new Set();  
    
    while (queue.length) {

        let closest = queue.shift();
        if (nodeVisited.has(closest)) continue;
        debugger
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        closest.distance = 1;
        nodeVisited.add(closest);
        if (closest.distance === end.distance) return visited;
        updateDepthFirstSearchNeighbors(closest, nodes);
        let neighbors = getUnvisitedDepthFirstNeighBors(closest, nodes);
        queue.push(...neighbors);
    }
}

function updateDepthFirstSearchNeighbors(node, nodes) {
    const unvisited = getUnvisitedDepthFirstNeighBors(node, nodes);
    for (let i = 0; i < unvisited.length; i++) {
        let neighbor = unvisited[i];
        neighbor.distance = node.distance = 1;
        neighbor.previous = node;
    }
}

function getUnvisitedDepthFirstNeighBors(node, nodes){
    const neighbors = [];
    const { row, col } = node;

    if (col > 0) {
        neighbors.push(nodes[row][col - 1])
    } else if (row < nodes.length - 1) {
        neighbors.push(nodes[row + 1][col])
    } else if (col < nodes[0].length - 1) {
        neighbors.push(nodes[row][col + 1])
    } else if (row > 0) {
        neighbors.push(nodes[row - 1][col])
    }

    return neighbors.filter(neighbor => !neighbor.visited);
}
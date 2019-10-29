export const dijkstra = (nodes, start, end) => {
    const visited = [];
    const unvisited = getAllNodes(nodes);
    if (!start || !end || start === end) return false;
    start.distance = 0;

   while (unvisited.length > 0){
    sortNodesDistance(unvisited);
        let closest = unvisited.shift();
        
        if (closest.distance === Infinity) return visited;
        
        closest.visited = true;
        visited.push(closest);

        if (closest.distance === end.distance) return visited;

        updateVisitedNeighbors(closest, nodes);
    }
}   

function getAllNodes(nodes) {
    const newNodes = [];
    for (let row = 0; row < 40; row++) {
        const currentRow = [];
        for (let col = 0; col < 30; col++) {
            newNodes.push(nodes[row][col]);
        }
    }
    return nodes;
}

function sortNodesDistance(unvisited){
    return unvisited.sort((node1, node2) => node1.distance - node2.distance);
}

function getUnvisitedNeighBors(node, nodes){
    const neighbors = [];
    const {row, col} = node;

    if (row > 0) neighbors.push(nodes[row - 1][col]);
    if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
    if (col > 0) neighbors.push(nodes[row][col - 1]);
    if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.visited);

}

function updateVisitedNeighbors(node, nodes){
    const unvisited = getUnvisitedNeighBors(node, nodes);
    for (let row = 0; row < 40; row++) {
        for (let col = 0; col < 30; col++) {
            let ele = nodes[row][col];
            ele.distance = node.distance + 1;
            ele.previous = node;
        }
    }
}
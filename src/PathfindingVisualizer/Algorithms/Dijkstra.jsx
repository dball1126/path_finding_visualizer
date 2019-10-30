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

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
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
    
    for (let i = 0; i < unvisited.length; i++) {
            let ele = unvisited[i];
            
            ele.distance = node.distance + 1;
            ele.previous = node;
        
    }
}

export const getNodesInShortestPath = (end) => {
    const nodesInShortestPath = [];
    let current = end;
    while (current !== null){
        nodesInShortestPath.unshift(current);
        current = current.previous;
    }
    return nodesInShortestPath;
}
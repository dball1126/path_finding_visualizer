// add cost from node similar to dykstra
// search all nodes around the main one possibly the 8 not just the 4 (u, l, r , d)
// as you move from the node add the cost from the main node + the next + next etc.. 
// create the open list   squares that need to be checked out and must be looked at.
// create the closed list    squares that have been already checked out and we dont have to look at
// 1. put A on the open list
// 2. you start with A as the parent and add the reachable nodes around it to the open list and add the parent square to the children.
// 3. drop the A from the open list and add it to the closed list 
// 4. next we choose one square from the open list and repeat the process above, but which one do we choose ?
//  We must use the equation F = G + H  to figure out which  node to choose.
//  G = the cost from moving from the node A to the current node we are on.
//  H = the estimated movement cost to move from that given square on the grid to the final destination...point B
//      its called the Heuristic because it's a guess. We calculate it by repeatedly going through the open list and 
//      choosing the square with the lowest F score


export const aStar = (nodes, start, end) => {
    const visited = [];
    let unvisited = getAllNodes(nodes);
        unvisited = set_heuristics(unvisited, end);

    if (!start || !end || start === end) return false;
    start.distance = 0;
    console.log(unvisited);
    debugger
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

export const getAllNodes = (grid) => {
    const nodes = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            nodes.push(grid[row][col]);
        }
    }
    return nodes;
}

export function sortNodesDistance(unvisited){
    return unvisited.sort((node1, node2) => node1.distance - node2.distance);
}

export function getUnvisitedNeighBors(node, nodes){
    const neighbors = [];
    const {row, col} = node;
    
    if (row > 0) neighbors.push(nodes[row - 1][col]);
    if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
    if (col > 0) neighbors.push(nodes[row][col - 1]);
    if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.visited);

}

export function updateVisitedNeighbors(node, nodes){
    const unvisited = getUnvisitedNeighBors(node, nodes);
    for (let i = 0; i < unvisited.length; i++) {
            let neighbor = unvisited[i];
            neighbor.distance = node.distance + 1;
            neighbor.previous = node;
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

const set_heuristics = (nodes, end) => {
    nodes.forEach(node => {
        node.heuristic = Math.abs((node.row - end.row) + (node.col - end.col)) * 5
    })
    return nodes
}
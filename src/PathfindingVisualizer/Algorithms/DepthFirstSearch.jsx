import {getAllNodes} from './Dijkstra';
import { get } from 'https';

export const depthFirstSearch = (nodes, start, end) => {
    
    let stack = [start];
    if (!start || !end || start === end) return false;
    start.distance = 0;
    let visited = [];
    let nodeVisited = new Set();  
    const unvisited = getAllNodes(nodes);
    const depthFirstOrder = depthFirstSearchOrder(start, nodes); 
    depthFirstOrder[0].distance = 0;
    
    while (depthFirstOrder.length) {

        let closest = depthFirstOrder.shift();
        
        // if (nodeVisited.has(closest)) continue;
        
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        closest.distance = 1;
        nodeVisited.add(closest);
        if (closest.distance === end.distance) return visited;
        updateNeighbor(closest, depthFirstOrder)
        // updateDepthFirstSearchNeighbors(closest, nodes);
        // let neighbors = getUnvisitedDepthFirstNeighBors(closest, nodes);
        // stack.push(...neighbors);
    }
    
    return visited;
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
    
    const nodeTracker = new Set();
    if (col > 0 && !nodeTracker.has(nodes[row][col - 1])) {
        if (nodes[row][col - 1]){

            nodeTracker.add(nodes[row][col - 1])
            neighbors.push(nodes[row][col - 1])
        }
    } else if (row < nodes.length - 1 && !nodeTracker.has(nodes[row + 1][col])) {
        if (nodes[row + 1][col]){

            nodeTracker.add(nodes[row + 1][col])
            neighbors.push(nodes[row + 1][col])
        }
    } else if (col < nodes.length - 1 && !nodeTracker.has(nodes[row][col + 1])) {
       
        if (nodes[row][col + 1]){

            nodeTracker.add(nodes[row][col + 1])
            neighbors.push(nodes[row][col + 1])
        }
    } else if (row > 0 && !nodeTracker.has(nodes[row - 1][col])) {
        if (nodes[row - 1][col]){

            nodeTracker.add(nodes[row - 1][col])
            neighbors.push(nodes[row - 1][col])
        }
    }
    
    return neighbors.filter(neighbor => !neighbor.visited);
}







function depthFirstSearchOrder(node, nodes) {
    const neighbors = [];
    let { row, col } = node;

    const nodeTracker = new Set();
    while (neighbors.length < nodes.length * nodes[0].length){

        if (col > 0 && neighbors.length <= nodes.length * nodes[0].length && !nodeTracker.has(nodes[row][col - 1])) {
            if (nodes[row][col - 1] ) { // up

            nodeTracker.add(nodes[row][col - 1])
            neighbors.push(nodes[row][col - 1])
            col = col -1
        }
        } else if (row < nodes.length - 1 && neighbors.length <= nodes.length * nodes[0].length && !nodeTracker.has(nodes[row + 1][col])) {
            if (nodes[row + 1][col] ) { // right

            nodeTracker.add(nodes[row + 1][col])
            neighbors.push(nodes[row + 1][col])
            row = row + 1
        }
        } else if (col < nodes.length - 1 && neighbors.length <= nodes.length * nodes[0].length && !nodeTracker.has(nodes[row][col + 1])) {
        
            if (nodes[row][col + 1] ) { // down

            nodeTracker.add(nodes[row][col + 1])
            neighbors.push(nodes[row][col + 1])
            col = col + 1
        }
        } else if (row > 0 && neighbors.length <= nodes.length * nodes[0].length && !nodeTracker.has(nodes[row - 1][col])) {
            if (nodes[row - 1][col] ) { // left

            nodeTracker.add(nodes[row - 1][col])
            neighbors.push(nodes[row - 1][col])
            row = row -1
        }
    }
    console.log(neighbors.length);

}
return neighbors;

}

function updateNeighbor(node, nodes){
    let neighbor = nodes[0];
    if (neighbor){}
    neighbor.distance = 1;
    neighbor.previous = node;
}
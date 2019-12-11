import {updateNodeWalls} from './BreathFirstSearch';
export const depthFirstSearch = (nodes, start, end) => {
    
    if (!start || !end || start === end) return false;
    start.distance = 0;
    let visited = [];
    let nodeVisited = new Set();  
    nodes = updateNodeWalls(nodes)
    
    debugger
    const depthFirstOrder = depthFirstSearchOrder(start, nodes); 
    depthFirstOrder[0].distance = 0;
    
    while (depthFirstOrder.length) {

        let closest = depthFirstOrder.shift();
                
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        closest.distance = 1;
        nodeVisited.add(closest);
        if (closest.distance === end.distance) return visited;
        updateNeighbor(closest, depthFirstOrder)
       
    }
    return visited;
}

function depthFirstSearchOrder(node, nodes) { //puts nodes in the actual order for them to traverse
    const neighbors = [];
    let { row, col } = node;

    const nodeTracker = new Set();
    for (let c = 0; c < nodes.length; c++) {
        for (let r = 0; r < nodes[c].length; r++) {        
            
        if (col > 0 && neighbors.length <= nodes.length * nodes[c].length && !nodeTracker.has(nodes[row][col - 1]) && !nodes[row][col-1].wall) {
            if (nodes[row][col - 1] ) { // up

            nodeTracker.add(nodes[row][col - 1])
            neighbors.push(nodes[row][col - 1])
            col = col -1
        }
        } else if (row < nodes.length - 1 && neighbors.length <= nodes.length * nodes[c].length && !nodeTracker.has(nodes[row + 1][col]) && !nodes[row+1][col].wall) {
            if (nodes[row + 1][col] ) { // right

            nodeTracker.add(nodes[row + 1][col])
            neighbors.push(nodes[row + 1][col])
            row = row + 1
        }
        } else if (col < nodes.length - 1 && neighbors.length <= nodes.length * nodes[c].length && !nodeTracker.has(nodes[row][col + 1]) && !nodes[row][col+1].wall) {
        
            if (nodes[row][col + 1] ) { // down

            nodeTracker.add(nodes[row][col + 1])
            neighbors.push(nodes[row][col + 1])
            col = col + 1
        }
        } else if (row > 0 && neighbors.length <= nodes.length * nodes[c].length && !nodeTracker.has(nodes[row - 1][col]) && !nodes[row-1][col].wall) {
            if (nodes[row - 1][col] ) { // left

            nodeTracker.add(nodes[row - 1][col])
            neighbors.push(nodes[row - 1][col])
            row = row -1
        }
    }
    }
    
}
return neighbors;
}

function updateNeighbor(node, nodes){ // updates our neighbors distance to just 1 since it is unweighted
    let neighbor = nodes[0];
    neighbor.distance = 1;
    neighbor.previous = node;
}
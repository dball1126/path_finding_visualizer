import {getAllNodes, updateVisitedNeighbors} from './Dijkstra';

export const aStar = (nodes, start, end) => {
    const visited = [];
    const unvisited = getAllNodes(nodes);
          setHeuristics(unvisited, end);

    if (!start || !end || start === end) return false;
    start.distance = 0;
    
   while (unvisited.length > 0){
        sortNodesFscore(unvisited);

        let closest = unvisited.shift(); 
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        if (closest.distance === end.distance) return visited;

        updateVisitedNeighbors(closest, nodes);        
    }
}   

const sortNodesFscore = (unvisited) => { // Update Fscore before sort..needed especially for for time.
    updateFscore(unvisited);
    return unvisited.sort((node1, node2) => (node1.fScore - node2.fScore));  
}

const updateFscore = (nodes) => { // F = (G = distance) + (H = Heuristic)
    nodes.forEach(node => { node.fScore = node.distance + node.heuristic });
    return nodes;
}

const setHeuristics = (nodes, end) => { // Set Initial heuristics.
    nodes.forEach(node => {
        node.heuristic = (Math.abs(node.row - end.row) + Math.abs(node.col - end.col)) * 5;
    })
    return nodes;
}
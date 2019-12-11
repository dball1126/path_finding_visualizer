import {setHeuristics} from './Astar';
import {getAllNodes, updateVisitedNeighbors, updateNodeWalls} from './Dijkstra';


export const greedy = (nodes, start, end) => {
    const visited = [];
    let unvisited = getAllNodes(nodes);
          setHeuristics(unvisited, end);
          unvisited = updateNodeWalls(unvisited);
          
    
    if (!start || !end || start === end) return false;
    start.distance = 0;
    start.heuristic = 0;
    
   while (unvisited.length > 0){
        sortNodesGreedy(unvisited);

        let closest = unvisited.shift(); 
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        if (closest.distance === end.distance) return visited;

        updateVisitedNeighbors(closest, nodes, 0);   // Pass weight of 0 since greedy only goes by heuristics     
    }
}

const sortNodesGreedy = (unvisited) => { // Sort by heuristics
    return unvisited.sort((node1, node2) => ((node1.distance + node1.heuristic) - (node2.distance + node2.heuristic)));  
}
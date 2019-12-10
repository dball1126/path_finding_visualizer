import {setHeuristics} from './Astar';
import {getAllNodes, updateVisitedNeighbors} from './Dijkstra';


export const greedy = (nodes, start, end) => {
    const visited = [];
    const unvisited = getAllNodes(nodes);
          setHeuristics(unvisited, end);

    if (!start || !end || start === end) return false;
    start.distance = 0;
    
   while (unvisited.length > 0){
        sortNodesGreedy(unvisited);

        let closest = unvisited.shift(); 
        if (closest.distance === Infinity) return visited;
        closest.visited = true;
        visited.push(closest);
        if (closest.distance === end.distance) return visited;

        updateVisitedNeighbors(closest, nodes);        
    }
}

const sortNodesGreedy = (unvisited) => { // Sort by heuristics
    return unvisited.sort((node1, node2) => ((node1.distance + node1.heuristic) - (node2.distance + node2.heuristic)));  
}
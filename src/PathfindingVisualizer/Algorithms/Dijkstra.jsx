export const dijkstra = (nodes, start, end) => {
    const visited = [];
    const unvisited = getAllNodes(nodes);
    if (!start || !end || start === end) return false;
    start.distance = 0;

   
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
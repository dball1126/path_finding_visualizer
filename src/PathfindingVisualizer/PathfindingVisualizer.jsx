import React, {useEffect, useState} from 'react';
import Node from './Node/Node';
import {aStar } from './Algorithms/Astar';
import {dijkstra, getNodesInShortestPath} from './Algorithms/Dijkstra';
import {breadthFirstSearch} from './Algorithms/BreathFirstSearch';
import { depthFirstSearch} from './Algorithms/DepthFirstSearch';
export default function PathfindingVisuablizer(){
    const [state, setState] = useState({ nodes: [] });
    const nodes = React.useMemo(() => state.nodes, []);

    
    useEffect(() =>{
        for (let row = 0; row < 30; row++) {
            const currentRow = [];
            for (let col = 0; col < 30; col++) {
                const currentNode = {
                    row,
                    col,
                    start: row === 10 && col === 10,
                    end: row === 25 && col === 25,
                    distance: Infinity,
                    visited: false,
                    previous: null,
                    heuristic: 0,
                    fScore: 0
                }
    
                currentRow.push(currentNode)
            }
    
            nodes.push(currentRow)
        }
        
            setState(prevState => {
                
                return { ...prevState, ...nodes }
            });
        }, [])
       
     


        
    return (
        <>
            <h1>Pathfinding Visualizer</h1>
            <div className="button-box">
                <button onClick={() => visualize("dijkstra")}>Visualize Dijkstra's Algorithm</button>
                <button onClick={() => visualize("bfs")}>Visualize Breadth First Search</button>
                <button onClick={() => visualize("dfs")}>Visualize Depth First Search</button>
                <button onClick={() => visualize("astar")}>Visualize A* Search</button>
                <button onClick={() => window.location.reload()}>Reset</button>
            </div>
            <div className="grid-box">
                <div className="grid">
                    {nodes.map((row, idx) => {

                        return (
                            <div className="nodes" key={idx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, start, end } = node;
                                    return <Node key={nodeIdx}
                                        row={row}
                                        col={col}
                                        start={start}
                                        end={end}
                                    />
                                })
                                }
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )

   
    
    
    
    // function visualizeDijkstra(){
    //      const {nodes} = state;
    //      const start = nodes[10][10];
    //      const end = nodes[25][25];
    //      const visitedNodes = dijkstra(nodes, start, end);
    //      const nodesInShortestPath = getNodesInShortestPath(end);
    //      animate(visitedNodes, nodesInShortestPath);
    //  }
    
    function visualize(buttonClicked){
         
    
         if (buttonClicked !== "" || buttonClicked !== undefined) {
    
         
         const { nodes } = state;
         const start = nodes[10][10];
         const end = nodes[25][25];
         let visitedNodes = [];
         
         if (buttonClicked === "astar")    visitedNodes = aStar(nodes, start, end);
         if (buttonClicked === "dfs")      visitedNodes = depthFirstSearch(nodes, start, end);
         if (buttonClicked === "bfs")      visitedNodes = breadthFirstSearch(nodes, start, end);
         if (buttonClicked === "dijkstra") visitedNodes = dijkstra(nodes, start, end);
             
         const nodesInShortestPath = getNodesInShortestPath(end);
         
         animate(visitedNodes, nodesInShortestPath);
         }
         
         setTimeout(() => { 
            window.location.reload();
                }, 15000)
     }
    
     
    
    function animate(visited, nodesInShortestPath) {
         
         for (let i = 0; i < visited.length; i++) {
             if (i === visited.length-1) {
                 
                 setTimeout(() => {
                     shortestPath(nodesInShortestPath);
                 }, 12 * i);
                 
                 return;            
             }
             setTimeout(() => {
                 const node = visited[i];
                 document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
             }, 12 * i);
         }
         
     }
    
    function shortestPath(nodesInShortestPath){
         for (let i = 0; i < nodesInShortestPath.length; i++) {
             
             setTimeout(() => {
                 const node = nodesInShortestPath[i];
                 document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
             }, 55 * i);
             
         }
     }
    
    // function getAllNodes(nodes) {
         
    //      if(nodes.length > 0){
    
    //          const newNodes = [];
    //          for (let row = 0; row < 30; row++) {
    //              const currentRow = [];
    //              for (let col = 0; col < 30; col++) {
    //                  newNodes.push(nodes[row][col]);
    //              }
    //          }
    //          return nodes;
    //      }
    // }
}


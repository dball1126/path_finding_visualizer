import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPath} from './Algorithms/Dijkstra';
import {breadthFirstSearch} from './Algorithms/BreathFirstSearch';
import { depthFirstSearch} from './Algorithms/DepthFirstSearch';
import { thisExpression } from '@babel/types';
export default class PathfindingVisuablizer extends Component {
    constructor(props){
        super(props);
        this.state = {nodes: []};
    }

    componentDidMount(){
        const nodes = [];
        for (let row = 0; row < 30; row++) {
           const currentRow = [];
           for (let col = 0; col < 30; col++) {
               const currentNode = {row, 
                                    col,
                                    start: row === 10 && col === 10,
                                    end: row === 25 && col === 25,
                                    distance: Infinity,
                                    visited: false,
                                    previous: null}
                
               currentRow.push(currentNode)
           }
           
            nodes.push(currentRow)
        }
        
        this.setState({nodes})
    }

   

    visualizeDijkstra(){
        const {nodes} = this.state;
        const start = nodes[10][10];
        const end = nodes[25][25];
        const visitedNodes = dijkstra(nodes, start, end);
        const nodesInShortestPath = getNodesInShortestPath(end);
        this.animate(visitedNodes, nodesInShortestPath);
    }

    visualize(buttonClicked){
        

        if (buttonClicked !== "" || buttonClicked !== undefined) {

        console.log(buttonClicked);
        
        const { nodes } = this.state;
        const start = nodes[10][10];
        const end = nodes[25][25];
        let visitedNodes = [];
        
        if (buttonClicked === "dfs")      visitedNodes = depthFirstSearch(nodes, start, end);
        if (buttonClicked === "bfs")      visitedNodes = breadthFirstSearch(nodes, start, end);
        if (buttonClicked === "dijkstra") visitedNodes = dijkstra(nodes, start, end);
            
        const nodesInShortestPath = getNodesInShortestPath(end);
        
        this.animate(visitedNodes, nodesInShortestPath);
        }

    }
    

    animate(visited, nodesInShortestPath) {
        
        for (let i = 0; i < visited.length; i++) {
            if (i === visited.length-1) {
                
                setTimeout(() => {
                    this.shortestPath(nodesInShortestPath);
                }, 12 * i);
                
                return;            
            }
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 12 * i);
        }
    }

    shortestPath(nodesInShortestPath){
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            
            setTimeout(() => {
                const node = nodesInShortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 55 * i);
            
        }
    }

    getAllNodes(nodes) {
        
        if(nodes.length > 0){

            const newNodes = [];
            for (let row = 0; row < 30; row++) {
                const currentRow = [];
                for (let col = 0; col < 30; col++) {
                    newNodes.push(nodes[row][col]);
                }
            }
            return nodes;
        }
}


    render(){
        const {nodes} = this.state;
        console.log(this.getAllNodes(nodes));
        return (
            <>
                <h1>Pathfinding Visualizer</h1>
                <div className="button-box">
                <button onClick={() => this.visualize("dijkstra")}>Visualize Dijkstra's Algorithm</button>
                <button onClick={() => this.visualize("bfs")}>Visualize Breadth First Search</button>
                <button onClick={() => this.visualize("dfs")}>Visualize Depth First Search</button>
                <button onClick={() => window.location.reload()}>Reset</button>
                </div>
                <div className="grid-box">
            <div className="grid">
                {nodes.map((row, idx) => {
                    
                    return (
                    <div className="nodes" key={idx}>
                        {row.map((node, nodeIdx) => {
                       const {row, col, start, end} = node;
                        return <Node key={nodeIdx} 
                                     row={row}
                                     col={col}
                                     start={start}
                                     end={end}
                                />})
                        }
                    </div>
                    )
                })}
                
            </div>
                </div>
            </>
        )
    }
}
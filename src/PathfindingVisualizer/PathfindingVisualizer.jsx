import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPath} from './Algorithms/Dijkstra';
export default class PathfindingVisuablizer extends Component {
    constructor(props){
        super(props);
        this.state = {nodes: []};
    }

    componentDidMount(){
        const nodes = [];
        for (let row = 0; row < 40; row++) {
           const currentRow = [];
           for (let col = 0; col < 30; col++) {
               const currentNode = {row, 
                                    col,
                                    start: row === 10 && col === 10,
                                    end: row === 30 && col === 25,
                                    distance: Infinity,
                                    visited: false,
                                    previous: null}
                
               currentRow.push(currentNode)
           }
           
            nodes.push(currentRow)
        }
        
        this.setState({nodes})
    }

    dijkstraButton(){
        const {nodes} = this.state;
        const start = nodes[10][10];
        const end = nodes[30][25];
        const visited = dijkstra(nodes, start, end);
    }

    visualize(){
        const {nodes} = this.state;
        const start = nodes[10][10];
        const end = nodes[30][25];
        const visitedNodes = dijkstra(nodes, start, end);
        const nodesInShortestPath = getNodesInShortestPath(end);
        
        this.animate(visitedNodes, nodesInShortestPath);
    }

    animate(visited, nodesInShortestPath) {
        for (let i = 0; i < visited.length; i++) {
            if (i === visited.length-1) {
                
                setTimeout(() => {
                    this.shortestPath(nodesInShortestPath);
                }, 10 * i);
                
                return;            
            }
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    shortestPath(nodesInShortestPath){
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            
            setTimeout(() => {
                const node = nodesInShortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
            
        }
    }

    getAllNodes(nodes) {
        
        if(nodes.length > 0){

            const newNodes = [];
            for (let row = 0; row < 40; row++) {
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
                <h1>Path Finder</h1>
                <button onClick={() => this.visualize()}>Visualize Dijkstra's Algorithm</button>
                <button onClick={() => window.location.reload()}>Reset</button>
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
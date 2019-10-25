import React, {Component} from 'react';
import Node from './Node/Node';

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
               const currentNode = {row, col}
               currentRow.push(currentNode)
           }
            nodes.push(currentRow)
        }
        
        this.setState({nodes})
    }

    render(){
        const {nodes} = this.state;
        
        return (
            <>
                <h1>Path Finder</h1>
                <div className="grid-box">
            <div className="grid">
                {nodes.map((row, idx) => {
                    return (
                    <div className="nodes" key={idx}>
                        {row.map((node, nodeIdx) => {
                        
                        return <Node key={nodeIdx}>{node}</Node>})
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
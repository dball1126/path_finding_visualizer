import React, {Component} from 'react';
import Node from './Node/Node';

export default class PathfindingVisuablizer extends Component {
    constructor(props){
        super(props);
        this.state = {nodes: []};
    }

    componentDidMount(){
        const nodes = [];
        for (let row = 0; row < 50; row++) {
           const currentRow = [];
           for (let col = 0; col < 50; col++) {
               currentRow.push([])
           }
            nodes.push(currentRow)
        }
        this.setState({nodes})
    }

    render(){
        const {nodes} = this.state;
        console.log(nodes)
        return (
            <div className="grid">
                <h1>Path Finder</h1>
                {nodes.map((row, idx) => {
                    return <div className="nodes">
                        {row.map((node, nodeIdx) => <Node></Node>)}
                    </div>
                })}
                
            </div>
        )
    }
}
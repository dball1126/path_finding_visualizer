import React, {Component} from 'react';
import Node from './Node/Node';

export default class PathfindingVisuablizer extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div>
                Path Finder
                <Node></Node>
            </div>
        )
    }
}
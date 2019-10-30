import React, {Component} from 'react';

export default class Node extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        
        const {start, end, row, col} = this.props;
        let extraClass = start ? 'node-start' : end ? 'node-end' : ''
        return (
        <div className={`actual-node ${extraClass}`} id={`node-${row}-${col}`}>
           
        </div>)
    }
}
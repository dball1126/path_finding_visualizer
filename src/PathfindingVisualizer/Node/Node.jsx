import React from 'react';

export default function Node(props) {
       
        const start = props.start, end = props.end, row = props.row, col = props.col;
        let classNameX = start ? 'node-start' : end ? 'node-end' : ''
        return (
        <div className={`actual-node ${classNameX}`} id={`node-${row}-${col}`}>
           
        </div>)
}
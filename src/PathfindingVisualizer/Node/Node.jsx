import React from 'react';

export default function Node(props) {
        const start = props.start, end = props.end, row = props.row, col = props.col, wall = props.wall;

        let classNameX = start ? 'node-start' : end ? 'node-end' : ''
        
        if (wall) classNameX = 'wall';
               
        

        return (
        <div className={`actual-node ${classNameX}`} id={`node-${row}-${col}`}>
           
        </div>)
}
import React, {Component} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default class MyApp extends Component {

  render(){
    const elements = [
       { data: { id: 'one', label: 'Node 1' }, position: { x: 100, y: 100 } },
       { data: { id: 'two', label: 'Node 2' }, position: { x: 200, y: 200 } },
       { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];

    return <CytoscapeComponent elements={elements} style={ { width: '600px', height: '600px' } } />;
  }
}
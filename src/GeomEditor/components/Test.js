import React from 'react';
export default class Test extends React.Component{
    constructor(props){
        super();
    }
    render(props){
        return <div><h1>Test {props}</h1></div>
    }
}
import React from 'react';
import '../Graph.css';

export default class HelpButton extends React.Component{
    onClick(){
        
    }
    render(){
        return <button 
                className={"helpButton noselect"}
                onClick={this.onClick.bind(this)}
                >
            ?
        </button>
    }
}
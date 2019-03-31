import React from 'react';
import '../App.css';

export default class LangToggleButton extends React.Component{
    onClick(){
        if(!this.props.pressed){
            this.props.setActiveLangButtonId(this.props.lang);
        }
    }
    render(){
        let className=this.props.pressed?"langToggleButtonDown":"langToggleButtonUp";
        return <div 
                id={this.props.lang}
                className={className+" noselect"}
                onClick={this.onClick.bind(this)}
                >
            
        </div>
    }
}
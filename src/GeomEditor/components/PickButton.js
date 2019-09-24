import React from 'react';
import '../Buttons.css';

export default class PickButton extends React.Component{

    render(){
        return <div onClick={this.props.onClick} className="pickButton"></div>
    }
}
import "../Graph.css";
import React from "react";

class PropertyEditButtonsBar extends React.Component{
    constructor(props){
        super(props);
        
    }
    onClick(e){
        this.props.delete();
    }

    render(){
        return <div className="propEditBar">
            <button className="deleteButton" onClick={this.onClick.bind(this)}>{this.props.caption}</button>
            
        </div>
    }
}
export default PropertyEditButtonsBar
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
            <button className="deleteButton" disabled={this.props.shapes.length===0} onClick={this.onClick.bind(this)}>Delete</button>
            
        </div>
    }
}
export default PropertyEditButtonsBar
import React from "react";

class PropertyEditButtonsBar extends React.Component{

    onClick(){
        this.props.deleteConfirm();
    }

    render(){
        return <div className="propEditBar">
            <button className="deleteButton" onClick={this.onClick.bind(this)}>{this.props.caption}</button>
            
        </div>
    }
}
export default PropertyEditButtonsBar
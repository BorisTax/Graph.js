import "../Graph.css";
import React from "react";

class PropertyField extends React.Component{

    change(e){
        
    }
    render(){
        return <div className={"noselect"}>
            {this.props.label}
            <input type="text" value={this.props.value.toFixed(4)} onChange={this.change.bind(this)}/>
        </div>
    }
}
export default PropertyField
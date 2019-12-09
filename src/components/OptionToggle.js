import "../Graph.css";
import React from "react";

class OptionToggle extends React.Component{

    change(e){
        this.props.action(e.target.checked);
    }
    render(){
        return <div className={"noselect"}>
            <input type="checkbox" checked={this.props.checked} onChange={this.change.bind(this)}/>{this.props.title}
        </div>
    }
}
export default OptionToggle
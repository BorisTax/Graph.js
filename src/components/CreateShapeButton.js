import React from "react";
import StraightLineCreator from './shapes/StraightLineCreator';
export default class CreateShapeButton extends React.Component{
    constructor(props){
        super(props);
    }
    onclick(e){
        this.props.screenContext.newShape(new StraightLineCreator(this.props.boundedCircle,"blue"));
    }
    render(){
        return <button className={"create-shape"}
                       onClick={this.onclick.bind(this)}

        >
            {this.props.title}
        </button>
    }
}
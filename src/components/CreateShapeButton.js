import React from "react";
import '../CreateButton.css';
export default class CreateShapeButton extends React.Component{
    constructor(props){
        super(props);
        this.state={pressed:false}
    }
    onclick(e){
        if(!this.state.pressed) this.props.screenContext.newShape(new this.props.creator(this.props.boundedCircle, "blue"));
         else this.props.screenContext.cancel();
        this.setState({pressed:!this.state.pressed});
    }
    render(){
        return <a href={"#"} className={!this.state.pressed?"createShapeButtonUp":"createShapeButtonDown"}
                       onClick={this.onclick.bind(this)}

        >
            {this.props.title}
        </a>
    }
}
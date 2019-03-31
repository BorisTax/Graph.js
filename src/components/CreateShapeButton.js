import React from "react";
import '../CreateButton.css';
import ShapeStyle from './shapes/ShapeStyle';
import Screen from './Screen';

export default class CreateShapeButton extends React.Component{
    constructor(props){
        super(props);
        this.state={pressed:props.pressed,id:props.id}
    }
    onclick(){
        if(!this.state.pressed) {
                this.props.setScreenStatus(Screen.STATUS_CREATE,new this.props.creator(new ShapeStyle("black", ShapeStyle.SOLID)));
                this.props.setButtonId(this.state.id);
            }
            else {
               this.props.setScreenStatus(Screen.STATUS_CANCEL);
               this.props.setButtonId("");
            }


        this.setState({pressed:!this.state.pressed});
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(
        {pressed:nextProps.pressed,id:nextProps.id}
        );
    }

    render(){

        return <div id={this.state.id}
                    className={!this.state.pressed?"createShapeButtonUp":"createShapeButtonDown"}
                       onClick={this.onclick.bind(this)}
                    title={this.props.title}

                    >

        </div>
    }
}

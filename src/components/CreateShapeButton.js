import React from "react";
import '../Buttons.css';
import ShapeStyle from './shapes/ShapeStyle';
import Screen from './Screen';

export default class CreateShapeButton extends React.Component{
    constructor(props){
        super(props);
        this.state={pressed:props.activeButtonId==props.id,id:props.id,index:this.props.index}
    }
    onclick(){
        if(!this.state.pressed) {
                this.props.setScreenStatus(Screen.STATUS_CREATE,new this.props.creator(new ShapeStyle("black", ShapeStyle.SOLID)));
                this.props.setButtonFirst(this.state.index);
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
        {pressed:nextProps.activeButtonId==nextProps.id,id:nextProps.id,index:nextProps.index}
        );
    }

    render(){
        let cls=!this.state.pressed?"createShapeButtonUp":"createShapeButtonDown";
        cls=cls+" createShapeButton";
        return <div id={this.state.id}
                    className={cls}
                       onClick={this.onclick.bind(this)}
                    title={this.props.title}
                    
                    >

        </div>
    }
}

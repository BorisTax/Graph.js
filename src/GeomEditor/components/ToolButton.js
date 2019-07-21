import React from "react";
import '../Buttons.css';

export default class ToolButton extends React.Component{
    constructor(props){
        super(props);
        this.state={pressed:props.activeButtonId===props.id}
    }
    onclick(){
        const pressed=this.props.activeButtonId===this.props.id;
        const params=!this.props.params?{id:this.props.id}:{...this.props.params,id:this.props.id};
        if(this.props.onClick)this.props.onClick({pressed,params});
        if(this.props.setButtonFirst)this.props.setButtonFirst(this.props.id);
    }

    render(){
        const pressed=this.props.activeButtonId===this.props.id;
        let cls=!pressed?"toolButtonUp":"toolButtonDown";
        cls=cls+" toolButton";
        return <div id={this.props.id}
                    className={cls}
                    onClick={this.onclick.bind(this)}
                    title={this.props.title}
                    
                    >

        </div>
    }
}

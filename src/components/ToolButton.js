import React from "react";

export default class ToolButton extends React.Component{
    constructor(props){
        super(props);
        this.state={pressed:props.activeButtonId===props.id}
    }
    onclick(){
        if(this.props.params&&this.props.params.dev) return;
        const pressed=this.props.activeButtonId===this.props.id;
        const params=!this.props.params?{id:this.props.id}:{...this.props.params,id:this.props.id};
        if(this.props.onClick)this.props.onClick({pressed,params});
        if(this.props.setButtonFirst)this.props.setButtonFirst(this.props.id);
    }

    render(){
        const pressed=this.props.activeButtonId===this.props.id;
        let title=this.props.title;
        if(this.props.params&&this.props.params.dev) title=`${title} ${this.props.params.dev}`
        let cls=!pressed?"toolButtonUp":"toolButtonDown";
        const enabled=this.props.enabled?" toolButtonEnabled":" toolButtonDisabled"
        const size=` ${this.props.size}`;
        cls=cls+" toolButton";
        const cls2=enabled+size
        return <div id={this.props.id}
                    className={cls}
                    onClick={this.onclick.bind(this)}
                    title={title}
                    
                    >
                <div className={cls2}></div>
        </div>
    }
}

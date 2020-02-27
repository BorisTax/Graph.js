import React from "react";

export default class ToggleButton extends React.Component{

    onclick(){
        if(!this.props.enabled)return;
        if(this.props.pressed) {
            if(!this.props.onUp) return;
            for(const action of this.props.onUp){
                if(typeof action.func==='function')action.func.apply(null,action.params)
                }
            }
            else {
                if(!this.props.onDown) return;
                for(const action of this.props.onDown){
                    if(typeof action.func==='function')action.func.apply(null,action.params)
                }
            }
    }
    render(){
        let cls=!this.props.pressed?"toolButtonUp":"toolButtonDown";
        const enabled=this.props.enabled?" toolButtonEnabled":" toolButtonDisabled"
        const id_enabled=this.props.enabled?"enabled":"disabled"
        const size=` ${this.props.size}`;
        cls=cls+" toolButton";
        const cls2=enabled+size
        return <div id={`${this.props.id}-${id_enabled}`}
                    className={cls}
                    onClick={this.onclick.bind(this)}
                    title={this.props.title}
                    
                    >
                <div className={cls2}></div>
        </div>
    }
}
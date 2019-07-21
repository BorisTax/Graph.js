import React from "react";

export default class OptionTogglePic extends React.Component{

    onclick(){
        if(!this.props.pressed) {
                this.props.setSnap(this.props.snapClass,true);
                this.props.setActiveSnapButton(this.props.id);
            }
            else {
                this.props.setSnap(this.props.snapClass,false);
                this.props.clearActiveSnapButton(this.props.id);
            }
    }
    render(){
        let cls=!this.props.pressed?"toolButtonUp":"toolButtonDown";
        cls=cls+" toolButton snapButton";
        return <div id={this.props.id}
                    className={cls}
                       onClick={this.onclick.bind(this)}
                    title={this.props.title}

                    >

        </div>
    }
}
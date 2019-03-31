import React from "react";

export default class OptionTogglePic extends React.Component{

    onclick(){
        if(!this.props.pressed) {
                this.props.setSnap({[this.props.id]:true});
                this.props.setActiveSnapButton(this.props.id);
            }
            else {
                this.props.setSnap({[this.props.id]:false});
                this.props.clearActiveSnapButton(this.props.id);
            }


    }
    render(){
        return <div id={this.props.id}
                    className={!this.props.pressed?"createShapeButtonUp":"createShapeButtonDown"}
                       onClick={this.onclick.bind(this)}
                    title={this.props.title}

                    >

        </div>
    }
}
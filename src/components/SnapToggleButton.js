import React from "react";
import {connect} from 'react-redux';
import {ScreenActions} from '../actions/ScreenActions';
import {ComponentActions} from '../actions/ComponentActions';
class SnapToggleButton extends React.Component{
    onclick(){
        if(!this.props.activeButtons.has(this.props.id)) {
            this.props.setSnap(this.props.snapClass,true);
            this.props.setActiveSnapButton(this.props.id);
            }
            else {
                this.props.setSnap(this.props.snapClass,false);
                this.props.clearActiveSnapButton(this.props.id);
            }
           this.forceUpdate();
    }
    render(){
        let clss=!this.props.activeButtons.has(this.props.id)?"toolButtonUp":"toolButtonDown";
        clss=clss+" toolButton toolButtonEnabled middleSizeButton";//space in front is important!
        return <div id={this.props.id}
                    className={clss}
                       onClick={this.onclick.bind(this)}
                    title={this.props.title}

                    >

        </div>
    }
}

const mapStateToProps=(store)=>{
    return {
        activeButtons:store.components.activeSnapButtons,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setSnap: (snapClass,snap)=>dispatch(ScreenActions.setSnap(snapClass,snap)),
        setActiveSnapButton: id=>dispatch(ComponentActions.setActiveSnapButton(id)),
        clearActiveSnapButton: id=>dispatch(ComponentActions.clearActiveSnapButton(id)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SnapToggleButton);
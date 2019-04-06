import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {setSnap} from '../actions/ScreenActions';
import {setActiveSnapButton,clearActiveSnapButton} from '../actions/ComponentActions';
import OptionTogglePic from './OptionTogglePic';
class SnapToggleBar extends React.Component{
    render(){
        let cap=this.props.captions;
        let snapToggleBar=cap?cap.snapToggleBar||"Snap":"Snap";
        let snapGridPoints=cap?cap.snapGridPoints||"grid points":"grid points";
        return <div className={"optionToggleBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{snapToggleBar}</span>
                </div>
                <br/>
        <OptionTogglePic title={snapGridPoints}
                        id={"grid"}
                      setSnap={this.props.setSnap}
                      setActiveSnapButton={this.props.setActiveSnapButton}
                      clearActiveSnapButton={this.props.clearActiveSnapButton}
                      pressed={this.props.activeButtons.has("grid")}
        />
        </div>
    }
}

const mapStateToProps = store => {

    return {
            screen: store.screen,
            captions:store.options.captions,
            activeButtons:store.components.activeSnapButtons,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSnap: snap=>dispatch(setSnap(snap)),
        setActiveSnapButton: id=>dispatch(setActiveSnapButton(id)),
        clearActiveSnapButton: id=>dispatch(clearActiveSnapButton(id)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SnapToggleBar)
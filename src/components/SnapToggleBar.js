import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {setSnap} from '../actions/ScreenActions';
import {setActiveSnapButton,clearActiveSnapButton} from '../actions/ComponentActions';
import OptionTogglePic from './OptionTogglePic';
import EndSnapMarker from "./shapes/snapmarkers/EndSnapMarker";
import MiddleSnapMarker from "./shapes/snapmarkers/MiddleSnapMarker";
import CenterSnapMarker from "./shapes/snapmarkers/CenterSnapMarker";
class SnapToggleBar extends React.Component{
    render(){
        let cap=this.props.captions;
        let snapToggleBar=cap?cap.snapToggleBar||"Snap":"Snap";
        let snapGridPoints=cap?cap.snapGridPoints||"grid points":"grid points";
        let snapEndPoints=cap?cap.snapEndPoints||EndSnapMarker.caption:EndSnapMarker.caption;
        let snapMiddlePoints=cap?cap.snapEndPoints||MiddleSnapMarker.caption:MiddleSnapMarker.caption;
        let snapCenterPoints=cap?cap.snapCenterPoints||CenterSnapMarker.caption:CenterSnapMarker.caption;
        return <div className={"toolBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{snapToggleBar}</span>
                </div>
                <br/>
        <OptionTogglePic title={snapGridPoints}
                           id={"grid"}
                           setSnap={this.props.setSnap}
                           snapClass={"grid"}
                           setActiveSnapButton={this.props.setActiveSnapButton}
                           clearActiveSnapButton={this.props.clearActiveSnapButton}
                           pressed={this.props.activeButtons.has("grid")}
        />
        <OptionTogglePic title={snapEndPoints}
                             id={"endpoint"}
                             setSnap={this.props.setSnap}
                             snapClass={EndSnapMarker}
                             setActiveSnapButton={this.props.setActiveSnapButton}
                             clearActiveSnapButton={this.props.clearActiveSnapButton}
                             pressed={this.props.activeButtons.has("endpoint")}
            />
         <OptionTogglePic title={snapMiddlePoints}
                             id={"middlepoint"}
                             setSnap={this.props.setSnap}
                             snapClass={MiddleSnapMarker}
                             setActiveSnapButton={this.props.setActiveSnapButton}
                             clearActiveSnapButton={this.props.clearActiveSnapButton}
                             pressed={this.props.activeButtons.has("middlepoint")}
            />
        <OptionTogglePic title={snapCenterPoints}
                             id={"centerpoint"}
                             setSnap={this.props.setSnap}
                             snapClass={CenterSnapMarker}
                             setActiveSnapButton={this.props.setActiveSnapButton}
                             clearActiveSnapButton={this.props.clearActiveSnapButton}
                             pressed={this.props.activeButtons.has("centerpoint")}
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
        setSnap: (snapClass,snap)=>dispatch(setSnap(snapClass,snap)),
        setActiveSnapButton: id=>dispatch(setActiveSnapButton(id)),
        clearActiveSnapButton: id=>dispatch(clearActiveSnapButton(id)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SnapToggleBar)
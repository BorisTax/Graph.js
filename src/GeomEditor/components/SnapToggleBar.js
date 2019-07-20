import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import {setSnap} from '../actions/ScreenActions';
import {setActiveSnapButton,clearActiveSnapButton} from '../actions/ComponentActions';
import OptionTogglePic from './OptionTogglePic';
import EndSnapMarker from "./shapes/snapmarkers/EndSnapMarker";
import MiddleSnapMarker from "./shapes/snapmarkers/MiddleSnapMarker";
import CenterSnapMarker from "./shapes/snapmarkers/CenterSnapMarker";
class SnapToggleBar extends React.Component{
    render(){
        let cap=this.props.captions.snap;
        return <div className={"toolBar snapToolBar"}>
                               
        <OptionTogglePic title={cap.snapGridPoints}
                           id={"grid"}
                           setSnap={this.props.setSnap}
                           snapClass={"grid"}
                           setActiveSnapButton={this.props.setActiveSnapButton}
                           clearActiveSnapButton={this.props.clearActiveSnapButton}
                           pressed={this.props.activeButtons.has("grid")}
        />
        <OptionTogglePic title={cap.snapEndPoints}
                             id={"endpoint"}
                             setSnap={this.props.setSnap}
                             snapClass={EndSnapMarker}
                             setActiveSnapButton={this.props.setActiveSnapButton}
                             clearActiveSnapButton={this.props.clearActiveSnapButton}
                             pressed={this.props.activeButtons.has("endpoint")}
            />
         <OptionTogglePic title={cap.snapMiddlePoints}
                             id={"middlepoint"}
                             setSnap={this.props.setSnap}
                             snapClass={MiddleSnapMarker}
                             setActiveSnapButton={this.props.setActiveSnapButton}
                             clearActiveSnapButton={this.props.clearActiveSnapButton}
                             pressed={this.props.activeButtons.has("middlepoint")}
            />
        <OptionTogglePic title={cap.snapCenterPoints}
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
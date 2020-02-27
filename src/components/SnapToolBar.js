import React from 'react';
import {connect} from 'react-redux';
import SnapToggleButton from './SnapToggleButton';
import EndSnapMarker from "./shapes/markers/EndSnapMarker";
import MiddleSnapMarker from "./shapes/markers/MiddleSnapMarker";
import CenterSnapMarker from "./shapes/markers/CenterSnapMarker";
class SnapToolBar extends React.Component{
    render(){
        let cap=this.props.captions.snap;
        return <div className={"toolBar snapToolBar"}>
        <SnapToggleButton title={cap.snapGridPoints}
                      id={"grid"}
                      snapClass={"grid"}
        />
        <SnapToggleButton title={cap.snapEndPoints}
                             id={"endpoint"}
                             snapClass={EndSnapMarker}
            />
         <SnapToggleButton title={cap.snapMiddlePoints}
                             id={"middlepoint"}
                             snapClass={MiddleSnapMarker}
            />
        <SnapToggleButton title={cap.snapCenterPoints}
                             id={"centerpoint"}
                             snapClass={CenterSnapMarker}
            />
        </div>
    }
}

const mapStateToProps = store => {

    return {
            //screen: store.screen,
            captions:store.options.captions,
            //activeButtons:store.components.activeSnapButtons,
    }
};

export default connect(mapStateToProps)(SnapToolBar)
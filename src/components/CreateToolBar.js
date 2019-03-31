import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import CreateShapeButton from "./CreateShapeButton";
import StraightLineCreator from "./shapes/StraightLineCreator";
import RayLineCreator from "./shapes/RayLineCreator";
import LineCreator from "./shapes/LineCreator";
import {setActiveCreateButton} from "../actions/ComponentActions";
import {setScreenStatus} from "../actions/ScreenActions";


class CreateToolBar extends React.Component{

    render(){
        let cap=this.props.captions;
        let createCaption=cap?cap.createToolBar:"Create";
        let strline=cap?cap.createSLine2Ponts:"Straight line";
        let rline=cap?cap.createRayLine2Points:"Ray line";
        let segline=cap?cap.createSegmentLine2Points:"Segment line";
        return <div className={"toolBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{createCaption}</span>
                </div>
                <br/>
            <CreateShapeButton title={strline}
                               id={"SLine"}
                               setButtonId={this.props.setButtonId}
                               pressed={this.props.activeButton=="SLine"}
                               creator={StraightLineCreator}
                               setScreenStatus={this.props.setScreenStatus}
                                />
            <CreateShapeButton title={rline}
                               id={"RLine"}
                               pressed={this.props.activeButton=="RLine"}
                               setButtonId={this.props.setButtonId}
                               creator={RayLineCreator}
                               setScreenStatus={this.props.setScreenStatus}
                                />
            <br/>
            <CreateShapeButton title={segline}
                               id={"Line"}
                               pressed={this.props.activeButton=="Line"}
                               setButtonId={this.props.setButtonId}
                               creator={LineCreator}
                               setScreenStatus={this.props.setScreenStatus}
                            />


        </div>
    }
}

const mapStateToProps = store => {

    return {
        boundedCircle:store.screen.boundedCircle,
        context:store.screen.context,
        captions:store.options.captions,
        activeButton:store.components.activeCreateButton,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setButtonId:id=>dispatch(setActiveCreateButton(id)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateToolBar)
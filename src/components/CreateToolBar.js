import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import CreateShapeButton from "./CreateShapeButton";
import CreateShapeButtonGroup from "./CreateShapeButtonGroup";
import StraightLineCreator from "./shapes/StraightLineCreator";
import RayLineCreator from "./shapes/RayLineCreator";
import LineCreator from "./shapes/LineCreator";
import CircleCRCreator from "./shapes/CircleCRCreator";
import RectangleCreator from "./shapes/RectangleCreator";
import {setActiveCreateButton} from "../actions/ComponentActions";
import {setScreenStatus} from "../actions/ScreenActions";


class CreateToolBar extends React.Component{

    render(){
        let cap=this.props.captions;
        let createCaption=cap?cap.createToolBar||"Create":"Create";
        let strline=cap?cap.createSLine2Points||"Straight line":"Straight line";
        let rline=cap?cap.createRayLine2Points||"Ray line":"Ray line";
        let segline=cap?cap.createSegmentLine2Points||"Segment line":"Segment line";
        let circleRad=cap?cap.createCircleCenter||"Circle by center":"Circle by center";
        let rect2p=cap?cap.createRect||"Rectangle by 2 points":"Rectangle by 2 points";
        return <div className={"toolBar createToolBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{createCaption}</span>
                </div>
            <CreateShapeButtonGroup 
                                buttons={[{title:strline,id:"SLine",creator:StraightLineCreator},
                                         {title:rline,id:"RLine",creator:RayLineCreator},
                                         {title:segline,id:"Line",creator:LineCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup 
                                buttons={[{title:circleRad,id:"CircleRad",creator:CircleCRCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup 
                                buttons={[{title:rect2p,id:"Rect2p",creator:RectangleCreator}
                                            ]}
                                />

        </div>
    }
}

const mapStateToProps = store => {

    return {
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
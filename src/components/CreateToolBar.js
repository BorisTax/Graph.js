import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import CreateShapeButton from "./CreateShapeButton";
import CreateShapeButtonGroup from "./CreateShapeButtonGroup";
import StraightLineCreator from "./shapes/shapecreators/StraightLineCreator";
import RayLineCreator from "./shapes/shapecreators/RayLineCreator";
import LineCreator from "./shapes/shapecreators/LineCreator";
import CircleCRCreator from "./shapes/shapecreators/CircleCRCreator";
import Circle2PCreator from "./shapes/shapecreators/Circle2PCreator";
import Circle3PCreator from "./shapes/shapecreators/Circle3PCreator";
import TriangleCreator from "./shapes/shapecreators/TriangleCreator";
import RectangleCreator from "./shapes/shapecreators/RectangleCreator";
import {setActiveCreateButton} from "../actions/ComponentActions";
import {setScreenStatus} from "../actions/ScreenActions";


class CreateToolBar extends React.Component{

    render(){
        let cap=this.props.captions;
        let createCaption=cap?cap.createToolBar||"Create":"Create";
        let strline=cap?cap.createSLine2Points||StraightLineCreator.caption:StraightLineCreator.caption;
        let rline=cap?cap.createRayLine2Points||RayLineCreator.caption:RayLineCreator.caption;
        let segline=cap?cap.createSegmentLine2Points||LineCreator.caption:LineCreator.caption;
        let circleRad=cap?cap.createCircleCenter||CircleCRCreator.caption:CircleCRCreator.caption;
        let circle2p=cap?cap.createCircle2P||Circle2PCreator.caption:Circle2PCreator.caption;
        let circle3p=cap?cap.createCircle3P||Circle3PCreator.caption:Circle3PCreator.caption;
        let rect2p=cap?cap.createRect||RectangleCreator.caption:RectangleCreator.caption;
        let triangle=cap?cap.createTriangle||TriangleCreator.caption:TriangleCreator.caption;
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
                                buttons={[{title:circleRad,id:"CircleRad",creator:CircleCRCreator},
                                          {title:circle2p,id:"Circle2p",creator:Circle2PCreator},
                                          {title:circle3p,id:"Circle3p",creator:Circle3PCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup 
                                buttons={[{title:rect2p,id:"Rect2p",creator:RectangleCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup
                buttons={[{title:triangle,id:"Triangle",creator:TriangleCreator}
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
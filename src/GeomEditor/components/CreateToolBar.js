import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
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
import {setScreenStatus, setCyclicFlag} from "../actions/ScreenActions";


class CreateToolBar extends React.Component{

    render(){
        const cap=this.props.captions.create;
        return <div className={"toolBar createToolBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{cap.createToolBar}</span>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="checkbox" onChange={(e)=>{this.props.setCyclicFlag(e.target.checked)}}/>
                    <span style={{fontSize:"small"}}>{cap.createCheckBox}</span>
                </div>
            <CreateShapeButtonGroup 
                                buttons={[{title:cap.createSLine2Points,id:"SLine",creator:StraightLineCreator},
                                         {title:cap.createRayLine2Points,id:"RLine",creator:RayLineCreator},
                                         {title:cap.createSegmentLine2Points,id:"Line",creator:LineCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup 
                                buttons={[{title:cap.createCircleCenter,id:"CircleRad",creator:CircleCRCreator},
                                          {title:cap.createCircle2P,id:"Circle2p",creator:Circle2PCreator},
                                          {title:cap.createCircle3P,id:"Circle3p",creator:Circle3PCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup 
                                buttons={[{title:cap.createRect,id:"Rect2p",creator:RectangleCreator}
                                            ]}
                                />
            <CreateShapeButtonGroup
                buttons={[{title:cap.createTriangle,id:"Triangle",creator:TriangleCreator}
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
        setCyclicFlag:(flag)=>dispatch(setCyclicFlag(flag)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateToolBar)
import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
import ToolButtonGroup from "./ToolButtonGroup";
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
import Screen from './Screen';
import ShapeStyle from './shapes/ShapeStyle';
import { Color } from './colors';


class CreateToolBar extends React.Component{
    onClick({pressed,params}){
        if(!pressed) {
            this.setButtonId(params.id);
            this.props.setScreenStatus(Screen.STATUS_CREATE,new params.creator(new ShapeStyle(Color.BLACK, ShapeStyle.SOLID)));
        }
        else {
           this.setButtonId("");
           this.props.setScreenStatus(Screen.STATUS_CANCEL);
        }
    }
    setButtonId(id){
        this.props.setActiveCreateButton(id);
    }
    render(){
        const cap=this.props.captions.create;
        return <div className={"toolBar"} id="createToolBar">
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{cap.createToolBar}</span>
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",left:-7}}>
                    <input type="checkbox" onChange={(e)=>{this.props.setCyclicFlag(e.target.checked)}}/>
                    <span style={{fontSize:"small"}}>{cap.createCheckBox}</span>
                </div>
            <ToolButtonGroup 
                                buttons={[{title:cap.createSLine2Points,id:"SLine",params:{creator:StraightLineCreator}},
                                         {title:cap.createRayLine2Points,id:"RLine",params:{creator:RayLineCreator}},
                                         {title:cap.createSegmentLine2Points,id:"Line",params:{creator:LineCreator}}
                                            ]}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}
                                />
            <ToolButtonGroup 
                                buttons={[{title:cap.createCircleCenter,id:"CircleRad",params:{creator:CircleCRCreator}},
                                          {title:cap.createCircle2P,id:"Circle2p",params:{creator:Circle2PCreator}},
                                          {title:cap.createCircle3P,id:"Circle3p",params:{creator:Circle3PCreator}}
                                            ]}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}
                                />
            <ToolButtonGroup 
                                buttons={[{title:cap.createRect,id:"Rect2p",params:{creator:RectangleCreator}}
                                            ]}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}            
                                />
            <ToolButtonGroup
                buttons={[{title:cap.createTriangle,id:"Triangle",params:{creator:TriangleCreator}}
                ]}
                activeButton={this.props.activeButton}
                onClick={this.onClick.bind(this)}
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
        setActiveCreateButton:id=>dispatch(setActiveCreateButton(id)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
        setCyclicFlag:(flag)=>dispatch(setCyclicFlag(flag)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateToolBar)
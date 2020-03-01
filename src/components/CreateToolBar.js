import React from 'react';
import { connect } from 'react-redux';
import ToolButtonGroup from "./ToolButtonGroup";
import StraightLineCreator from "./shapes/shapecreators/StraightLineCreator";
import RayLineCreator from "./shapes/shapecreators/RayLineCreator";
import LineCreator from "./shapes/shapecreators/LineCreator";
import CircleCRCreator from "./shapes/shapecreators/CircleCRCreator";
import Circle2PCreator from "./shapes/shapecreators/Circle2PCreator";
import Circle3PCreator from "./shapes/shapecreators/Circle3PCreator";
import TriangleCreator from "./shapes/shapecreators/TriangleCreator";
import RectangleCreator from "./shapes/shapecreators/RectangleCreator";
import {ComponentActions} from "../actions/ComponentActions";
import {ScreenActions} from "../actions/ScreenActions";
import ShapeStyle from './shapes/ShapeStyle';
import { Color } from './colors';

class CreateToolBar extends React.Component{
    onClick({pressed,params}){
        if(!pressed) {
            this.setButtonId(params.id);
            this.props.createNewShape(new params.creator(new ShapeStyle(Color.BLACK, ShapeStyle.SOLID),this.props.screenOuterCircle));
        }
        else {
           this.setButtonId("");
           this.props.cancel();
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
                <hr/>
                <div className="checkbox">
                    <input type="checkbox" id="cyclic" onChange={(e)=>{this.props.setCyclicFlag(e.target.checked)}}/>
                    <label htmlFor="cyclic">{cap.createCheckBox}</label>
                </div>
            <ToolButtonGroup 
                                buttons={[{title:cap.createSLine2Points,id:"SLine",params:{creator:StraightLineCreator}},
                                         {title:cap.createRayLine2Points,id:"RLine",params:{creator:RayLineCreator}},
                                         {title:cap.createSegmentLine2Points,id:"Line",params:{creator:LineCreator}}
                                            ]}
                                size={'largeSizeButton'}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}
                                />
            <ToolButtonGroup 
                                buttons={[{title:cap.createCircleCenter,id:"CircleRad",params:{creator:CircleCRCreator}},
                                          {title:cap.createCircle2P,id:"Circle2p",params:{creator:Circle2PCreator}},
                                          {title:cap.createCircle3P,id:"Circle3p",params:{creator:Circle3PCreator}}
                                            ]}
                                size={'largeSizeButton'}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}
                                />
            <ToolButtonGroup 
                                buttons={[{title:cap.createRect,id:"Rect2p",params:{creator:RectangleCreator}},
                                          {title:cap.createRectCenter,id:"RectCenter",params:{creator:null,dev:cap.development}}    
                                            ]}
                                size={'largeSizeButton'}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}            
                                />
            <ToolButtonGroup
                buttons={[{title:cap.createTriangle,id:"Triangle",params:{creator:TriangleCreator}},
                        {title:cap.createTriangleInscribed,id:"TriangleInscribed",params:{creator:null,dev:cap.development}},
                        {title:cap.createTriangleDescribed,id:"TriangleDescribed",params:{creator:null,dev:cap.development}}
                ]}
                size={'largeSizeButton'}
                activeButton={this.props.activeButton}
                onClick={this.onClick.bind(this)}
            />
            <ToolButtonGroup
                buttons={[{title:cap.createParabola,id:"Parabola",params:{creator:null,dev:cap.development}},
                        {title:cap.createHyperbola,id:"Hyperbola",params:{creator:null,dev:cap.development}},
                ]}
                size={'largeSizeButton'}
                activeButton={this.props.activeButton}
                onClick={this.onClick.bind(this)}
            />
            <ToolButtonGroup
                buttons={[{title:cap.createFunction,id:"Function",params:{creator:null,dev:cap.development}}
                ]}
                size={'largeSizeButton'}
                activeButton={this.props.activeButton}
                onClick={this.onClick.bind(this)}
            />

        </div>
    }
}

const mapStateToProps = (store,ownProps) => {

    return {
        screenOuterCircle:store.screen.screenOuterCircle,
        context:store.screen.context,
        captions:store.options.captions,
        activeButton:store.components.activeCreateButton,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        cancel:()=>dispatch(ScreenActions.cancel()),
        createNewShape:(creator)=>dispatch(ScreenActions.createNewShape(creator)),
        setActiveCreateButton:id=>dispatch(ComponentActions.setActiveCreateButton(id)),
        setScreenStatus:(status,params)=>dispatch(ScreenActions.setScreenStatus(status,params)),
        setCyclicFlag:(flag)=>dispatch(ScreenActions.setCyclicFlag(flag)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateToolBar)
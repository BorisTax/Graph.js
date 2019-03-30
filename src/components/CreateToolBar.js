import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import CreateShapeButton from "./CreateShapeButton";
import StraightLineCreator from "./shapes/StraightLineCreator";
import RayLineCreator from "./shapes/RayLineCreator";
import LineCreator from "./shapes/LineCreator";
import {setButtonID} from "../actions/ComponentActions";
import {createNewShape,setScreenStatus} from "../actions/ScreenActions";


class CreateToolBar extends React.Component{

    render(){
        let createCaption=this.props.captions?this.props.captions.main.toolBars.create.caption:"Create";
        let strline=this.props.captions?this.props.captions.main.toolBars.create.straight.buttonTitle:"Straight line";
        let rline=this.props.captions?this.props.captions.main.toolBars.create.ray.buttonTitle:"Ray line";
        let segline=this.props.captions?this.props.captions.main.toolBars.create.segment.buttonTitle:"Segment line";
        return <div className={"createToolBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{createCaption}</span>
                </div>
                <br/>
            <CreateShapeButton title={strline}
                               id={"SLine"}
                               setButtonID={this.props.setButtonID}
                               pressed={this.props.buttonId==="SLine"}
                               creator={StraightLineCreator}
                               createNewShape={this.props.createNewShape}
                               setScreenStatus={this.props.setScreenStatus}
                                />
            <CreateShapeButton title={rline}
                               id={"RLine"}
                               pressed={this.props.buttonId==="RLine"}
                               setButtonID={this.props.setButtonID}
                               creator={RayLineCreator}
                               createNewShape={this.props.createNewShape}
                               setScreenStatus={this.props.setScreenStatus}
                                />
            <br/>
            <CreateShapeButton title={segline}
                               id={"Line"}
                               pressed={this.props.buttonId==="Line"}
                               setButtonID={this.props.setButtonID}
                               creator={LineCreator}
                               createNewShape={this.props.createNewShape}
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
        buttonId:store.components.buttonId,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setButtonID:id=>dispatch(setButtonID(id)),
        createNewShape:creator=>dispatch(createNewShape(creator)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateToolBar)
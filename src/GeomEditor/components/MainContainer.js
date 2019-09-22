import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
import {setScreenStatus,selectShapes,selectAll,addShape,centerToPoint, deleteSelectedShapes, setTopLeft, setPickedData, fixPickedData, cancel, setCurCoord, refreshSnapMarkers, refreshShapeManager, setDimensions, setBoundedCircle, setRealWidth,setRatio, repaint, setScale, setPrevStatus} from "../actions/ScreenActions";
import {setLanguage} from "../actions/AppActions";
import CreateToolBar from "./CreateToolBar";
import Screen from "./Screen";
import SnapToggleBar from './SnapToggleBar';
import PropertyEditorBar from './PropertyEditorBar';
import SelectionToolBar from './SelectionToolBar';

class MainContainer extends React.Component{
    render(){
        return <div className={'mainContainer'}>
        <div className={'screenContainer'}>
            <Screen style={{borderWidth:1+'px',borderStyle:"solid"}}
                actions={this.props.actions}
                keyDownHandler={this.props.keyDownHandler}
                {...this.props.screen}
                />
                </div>
        <CreateToolBar/>
        <SelectionToolBar/>
        <PropertyEditorBar/>
        <SnapToggleBar/>
        
    </div>
    }
}
const mapStateToProps = store => {
    return {
            screen: {...store.screen,captions:store.options.captions},
            keyDownHandler:store.options.keyDownHandler,
    }
};
const mapDispatchToProps = dispatch => {
    return {actions:{
        addShape:(shape)=>dispatch(addShape(shape)),
        cancel:()=>dispatch(cancel()),
        centerToPoint:(p)=>dispatch(centerToPoint(p)),
        deleteSelectedShapes:({ask})=>dispatch(deleteSelectedShapes(ask)),
        fixPickedData:fix=>dispatch(fixPickedData(fix)),
        refreshShapeManager:()=>dispatch(refreshShapeManager()),
        refreshSnapMarkers:()=>dispatch(refreshSnapMarkers()),
        repaint:()=>dispatch(repaint()),
        selectAll:()=>dispatch(selectAll()),
        selectShapes:(selectedShapes)=>dispatch(selectShapes(selectedShapes)),
        setBoundedCircle:()=>dispatch(setBoundedCircle()),
        setCurCoord:(coord)=>dispatch(setCurCoord(coord)),
        setDimensions:(width,height,realWidth,topLeft)=>dispatch(setDimensions(width,height,realWidth,topLeft)),
        setLanguage:captions=>dispatch(setLanguage(captions)),
        setPickedData:data=>dispatch(setPickedData(data)),
        setPrevStatus:()=>dispatch(setPrevStatus()),
        setRatio:(ratio)=>dispatch(setRatio(ratio)),
        setRealWidth:(width)=>dispatch(setRealWidth(width)),
        setScale:(scale,anchor)=>dispatch(setScale(scale,anchor)),
        setScreenStatus:(status,params)=>dispatch(setScreenStatus(status,params)),
        setTopLeft:(p)=>dispatch(setTopLeft(p)),
    }}
};
export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
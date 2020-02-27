import React from 'react';
import { connect } from 'react-redux';
import {ScreenActions} from "../actions/ScreenActions";
import {setLanguage} from "../actions/AppActions";
import CreateToolBar from "./CreateToolBar";
import Screen from "./Screen";
import SnapToolBar from './SnapToolBar';
import TransformBar from './TransformBar';
import PropertyEditorBar from './PropertyEditorBar';
import SelectionToolBar from './SelectionToolBar';
import { createShape } from '../actions/ShapeActions';

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
        <SnapToolBar/>
        <TransformBar/>
        
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
        abort:()=>dispatch(ScreenActions.abort()),
        addShape:(shape)=>dispatch(ScreenActions.addShape(shape)),
        cancel:()=>dispatch(ScreenActions.cancel()),
        cancelSelection:()=>dispatch(ScreenActions.cancelSelection()),
        centerToPoint:(p)=>dispatch(ScreenActions.centerToPoint(p)),
        createShape:(creator)=>dispatch(createShape(creator)),
        deleteConfirm:()=>dispatch(ScreenActions.deleteConfirm()),
        refreshSelectionManager:()=>dispatch(ScreenActions.refreshSelectionManager()),
        refreshSnapMarkers:()=>dispatch(ScreenActions.refreshSnapMarkers()),
        repaint:()=>dispatch(ScreenActions.repaint()),
        selectAll:()=>dispatch(ScreenActions.selectAll()),
        selectShapes:(selectedShapes)=>dispatch(ScreenActions.selectShapes(selectedShapes)),
        setBoundedCircle:()=>dispatch(ScreenActions.setBoundedCircle()),
        setCurCoord:(coord,screenPoint)=>dispatch(ScreenActions.setCurCoord(coord,screenPoint)),
        setDimensions:(width,height,realWidth,topLeft)=>dispatch(ScreenActions.setDimensions(width,height,realWidth,topLeft)),
        setLanguage:captions=>dispatch(setLanguage(captions)),
        setPickedData:data=>dispatch(ScreenActions.setPickedData(data)),
        setPrevCoord:(coord)=>dispatch(ScreenActions.setPrevCoord(coord)),
        setPrevStatus:()=>dispatch(ScreenActions.setPrevStatus()),
        setRatio:(ratio)=>dispatch(ScreenActions.setRatio(ratio)),
        setRealWidth:(width)=>dispatch(ScreenActions.setRealWidth(width)),
        setScale:(scale,anchor)=>dispatch(ScreenActions.setScale(scale,anchor)),
        setScreenStatus:(status,params)=>dispatch(ScreenActions.setScreenStatus(status,params)),
        setTopLeft:(p)=>dispatch(ScreenActions.setTopLeft(p)),
    }}
};
export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
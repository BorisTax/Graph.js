import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
import {setScreenStatus,selectShapes,addShape} from "../actions/ScreenActions";
import {setLanguage} from "../actions/AppActions";
import CreateToolBar from "./CreateToolBar";
import Screen from "./Screen.js";
import SnapToggleBar from './SnapToggleBar';
import ShowToggleBar from './ShowToggleBar';
import PropertyEditorBar from './PropertyEditorBar';

class MainContainer extends React.Component{
    render(){
        return <div className={'mainContainer'}>
        
        <div className={'screenContainer'}>
            <Screen style={{borderWidth:1+'px',borderStyle:"solid"}}
                setStatus={this.props.setScreenStatus}
                selectShapes={this.props.selectShapes}
                addShape={this.props.addShape}
                {...this.props.screen}/>
                </div>
        <CreateToolBar/>
        <PropertyEditorBar/>
        <SnapToggleBar/>
        
    </div>
    }
}
const mapStateToProps = store => {

    return {
            screen: store.screen,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setLanguage:captions=>dispatch(setLanguage(captions)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
        selectShapes:(selectedShapes)=>dispatch(selectShapes(selectedShapes)),
        addShape:(shape)=>dispatch(addShape(shape))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
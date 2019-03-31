import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import {setBoundedCircle,setScreenStatus} from "../actions/ScreenActions";
import {setLanguage} from "../actions/AppActions";
import CreateToolBar from "./CreateToolBar";
import Screen from "./Screen.js";
import SnapToggleBar from './SnapToggleBar';
import ShowToggleBar from './ShowToggleBar';

class MainContainer extends React.Component{
    render(){
        return <div className={"mainContainer"}>
        <CreateToolBar/>
        <SnapToggleBar/>
        <ShowToggleBar/>
        <Screen setBoundedCircle={this.props.setBoundedCircle} style={{borderWidth:1+'px',borderStyle:"solid"}}
                setStatus={this.props.setScreenStatus}
                {...this.props.screen}/>

    </div>
    }
}
const mapStateToProps = store => {

    return {
            screen: store.screen,
            captions:store.captions,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setBoundedCircle:circle=>dispatch(setBoundedCircle(circle)),
        setLanguage:captions=>dispatch(setLanguage(captions)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
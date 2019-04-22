import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
import {setScreenStatus} from "../actions/ScreenActions";
import {setLanguage} from "../actions/AppActions";
import CreateToolBar from "./CreateToolBar";
import Screen from "./Screen.js";
import SnapToggleBar from './SnapToggleBar';
import ShowToggleBar from './ShowToggleBar';

class MainContainer extends React.Component{
    render(){
        return <div className={"mainContainer"}>
        <CreateToolBar/>
        
        <Screen style={{borderWidth:1+'px',borderStyle:"solid"}}
                setStatus={this.props.setScreenStatus}
                {...this.props.screen}/>
        <SnapToggleBar/>
        <ShowToggleBar/>
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
        setLanguage:captions=>dispatch(setLanguage(captions)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(MainContainer)
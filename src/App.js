import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import Screen from "./components/Screen.js";
import OptionToggle from "./components/OptionToggle";
import {setGridVisible, setGridSnap, setBoundedCircle,setScreenContext,setScreenStatus} from "./actions/ScreenActions";
import {setLanguage} from "./actions/AppActions";
import CreateToolBar from "./components/CreateToolBar";
import {engCaptions} from './locale/eng';

class App extends React.Component {
    constructor(props){
        super(props);
        props.setLanguage(engCaptions);
    }
    render() {
        return <div className={"mainContainer"}>
            <CreateToolBar/>

            <div className={"option-toggle-toolbar"} style={{borderWidth:1+'px',borderStyle:"solid"}}>
            <OptionToggle title={"Show grid"}
                          action={this.props.setGridVisible}
                          checked={this.props.screen.show.grid}
            />
            <OptionToggle title={"Snap"}
                          action={this.props.setGridSnap}
                          checked={this.props.screen.snap.grid}
            />
            </div>
            <Screen setBoundedCircle={this.props.setBoundedCircle} style={{borderWidth:1+'px',borderStyle:"solid"}}
                    returnContext={this.props.setScreenContext}
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
        setGridVisible: visible=>dispatch(setGridVisible(visible)),
        setGridSnap: snap=>dispatch(setGridSnap(snap)),
        setBoundedCircle:circle=>dispatch(setBoundedCircle(circle)),
        setScreenContext:context=>dispatch(setScreenContext(context)),
        setLanguage:captions=>dispatch(setLanguage(captions)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)

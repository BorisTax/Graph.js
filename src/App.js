import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import Screen from "./components/Screen.js";
import OptionToggle from "./components/OptionToggle";
import {setGridVisible, setGridSnap, setBoundedCircle,setScreenContext} from "./actions/ScreenActions";
import CreateToolBar from "./components/CreateToolBar";

class App extends React.Component {
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
                    {...this.props.screen}/>

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
        setGridVisible: visible=>dispatch(setGridVisible(visible)),
        setGridSnap: snap=>dispatch(setGridSnap(snap)),
        setBoundedCircle:circle=>dispatch(setBoundedCircle(circle)),
        setScreenContext:context=>dispatch(setScreenContext(context)),

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)

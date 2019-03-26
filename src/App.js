import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import Screen from "./components/Screen.js";
import OptionToggle from "./components/OptionToggle";
import {setGridVisible, setGridSnap} from "./actions/ScreenActions";

class App extends React.Component {
    render() {
        return <div>
            <OptionToggle title={"Show grid"}
                          action={this.props.setGridVisible}
                          checked={this.props.screen.show.grid}
            />
            <OptionToggle title={"Snap"}
                          action={this.props.setGridSnap}
                          checked={this.props.screen.snap.grid}
            />
            <Screen {...this.props.screen}/>

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
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)

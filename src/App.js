import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import Screen from "./components/Screen.js";
import OptionToggle from "./components/OptionToggle";
import {setGridVisible} from "./actions/ScreenActions";

class App extends React.Component {
    render() {
        return <div>
            <OptionToggle title={"Show grid"}
                          action={this.props.setGridVisible}
                          checked={this.props.screen.show.grid}
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
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)

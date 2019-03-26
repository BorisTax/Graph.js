import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import Screen from "./components/Screen.js";
import OptionToggle from "./components/OptionToggle";
import CreateShapeButton from "./components/CreateShapeButton";
import {setGridVisible, setGridSnap, setBoundedCircle,setScreenContext} from "./actions/ScreenActions";
import {createShape} from "./actions/ShapeActions";
import StraightLineCreator from './components/shapes/StraightLineCreator';

class App extends React.Component {
    render() {
        return <div>
            <div className={"create-toolbar"}>
                <CreateShapeButton title={"Straight Line"}
                                   boundedCircle={this.props.boundedCircle}
                                   screenContext={this.props.context}
                                   creator={StraightLineCreator}/>
            </div>
            <div className={"option-toggle-toolbar"}>
            <OptionToggle title={"Show grid"}
                          action={this.props.setGridVisible}
                          checked={this.props.screen.show.grid}
            />
            <OptionToggle title={"Snap"}
                          action={this.props.setGridSnap}
                          checked={this.props.screen.snap.grid}
            />
            </div>
            <Screen setBoundedCircle={this.props.setBoundedCircle}
                    returnContext={this.props.setScreenContext}
                    {...this.props.screen}/>

        </div>

    }
}
const mapStateToProps = store => {

    return {
            screen: store.screen,
            boundedCircle:store.screen.boundedCircle,
            context:store.screen.context,
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

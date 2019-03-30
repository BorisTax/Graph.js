import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import OptionToggle from "./OptionToggle";
import {setGridVisible,setGridSnap} from '../actions/ScreenActions';
class OptionToggleBar extends React.Component{
    render(){
        return <div className={"optionToggleBar"}>
        <OptionToggle title={"Show grid"}
                      action={this.props.setGridVisible}
                      checked={this.props.screen.show.grid}
        />
        <OptionToggle title={"Snap"}
                      action={this.props.setGridSnap}
                      checked={this.props.screen.snap.grid}
        />
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
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(OptionToggleBar)
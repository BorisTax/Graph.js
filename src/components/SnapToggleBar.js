import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {setSnap} from '../actions/ScreenActions';
import {setActiveSnapButton,clearActiveSnapButton} from '../actions/ComponentActions';
import OptionTogglePic from './OptionTogglePic';
class SnapToggleBar extends React.Component{
    render(){
        return <div className={"optionToggleBar"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>{"Snap"}</span>
                </div>
                <br/>
        <OptionTogglePic title={"grid points"}
                        id={"grid"}
                      setSnap={this.props.setSnap}
                      setActiveSnapButton={this.props.setActiveSnapButton}
                      clearActiveSnapButton={this.props.clearActiveSnapButton}
                      pressed={this.props.activeButtons.has("grid")}
        />
        </div>
    }
}

const mapStateToProps = store => {

    return {
            screen: store.screen,
            captions:store.captions,
            activeButtons:store.components.activeSnapButtons,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSnap: snap=>dispatch(setSnap(snap)),
        setActiveSnapButton: id=>dispatch(setActiveSnapButton(id)),
        clearActiveSnapButton: id=>dispatch(clearActiveSnapButton(id)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SnapToggleBar)
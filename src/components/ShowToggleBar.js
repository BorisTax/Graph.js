import React from 'react';
import {connect} from 'react-redux';
import OptionToggle from './OptionToggle';
import {setGridVisible} from '../actions/ScreenActions';
class ShowToggleBar extends React.Component{
    render(){
        let cap=this.props.captions;
        return <div className={"toolBar"}>
            <OptionToggle title={cap.showGrid}
                      action={this.props.setGridVisible}
                      checked={this.props.model.show.grid}
        />
        </div>
    }
}

const mapStateToProps = store => {

    return {
            model: store.model,
            captions:store.options.captions,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setGridVisible: visible=>dispatch(setGridVisible(visible)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(ShowToggleBar)
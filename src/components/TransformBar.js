import React from 'react';
import {connect} from 'react-redux';
import {ComponentActions} from '../actions/ComponentActions';

import ToggleButton from './ToggleButton';
import { ScreenActions } from '../actions/ScreenActions';
import { Status } from '../reducers/screen';

class TransformBar extends React.Component{
    render(){
        let cap=this.props.captions.transform;
        return <div className={"toolBar"}>
        <ToggleButton title={cap.move.description}
                           id={"move"}
                           onDown={[{func:this.props.setStatus,params:[Status.MOVETRANS]}]}
                           onUp={[{func:this.props.abort,params:[]}]}
                           pressed={this.props.activeTransformButton==="move"}
                           enabled={this.props.screen.selectionManager.selectedShapes>0}
                           size={'middleSizeButton'}
        />
        <br/>
        <ToggleButton title={cap.rotate.description}
                   id={"rotate"}
                   onDown={[{func:this.props.setStatus,params:[Status.ROTATETRANS]}]}
                   onUp={[{func:this.props.abort,params:[]}]}
                   pressed={this.props.activeTransformButton==="rotate"}
                   enabled={this.props.screen.selectionManager.selectedShapes>0}
                   size={'middleSizeButton'}
        />

        </div>
    }
}

const mapStateToProps = store => {

    return {
            screen: store.screen,
            captions:store.options.captions,
            activeTransformButton:store.components.activeTransformButton,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setActiveButton: id=>dispatch(ComponentActions.setActiveTransformButton(id)),
        setStatus: (status)=>dispatch(ScreenActions.setScreenStatus(status)),
        cancel:()=>dispatch(ScreenActions.cancel()),
        abort:()=>dispatch(ScreenActions.abort()),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TransformBar)
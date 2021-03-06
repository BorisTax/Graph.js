import React from 'react';
import {showConfirm, blink} from '../actions/AppActions';
import { connect } from 'react-redux';
import {store} from '../store/configureStore'
class Confirm extends React.Component{
    
    render(){
        return <div className='modalContainer  noselect' onClick={blink}>
                    <div className={"toolBar"} onClick={(e)=>{e.stopPropagation()}}>
                      <div>{this.props.captions.messages[this.props.messageKey]}</div>
                        <div className="flexCenter">
                        <button onClick={()=>{
                            store.dispatch(this.props.onOk());
                            this.props.hideConfirm()}}>OK</button>
                        <button onClick={this.props.hideConfirm}>{this.props.captions.buttons.cancel}</button>
                        </div>
                    </div>
                </div>
    }
}
const mapStateToProps=store=>{
    return {
        captions:store.options.captions,
    }
};
const mapDispatchToProps=dispatch=>{
    return{
        hideConfirm:()=>dispatch(showConfirm(false))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Confirm);

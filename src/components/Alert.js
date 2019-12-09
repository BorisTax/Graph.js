import React from 'react';
import '../Graph.css';
import '../Buttons.css';
import {showAlert, blink} from '../actions/AppActions';
import { connect } from 'react-redux';

class Alert extends React.Component{
    render(){
        return <div className='modalContainer  noselect' onClick={blink}>
                    <div className={"toolBar"} onClick={(e)=>{e.stopPropagation()}}>
                        <div>{this.props.captions.messages[this.props.messageKey]}</div>
                        <div className="flexCenter">
                        <button onClick={()=>{
                            this.props.hideAlert()}}>OK</button>
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
        hideAlert:()=>dispatch(showAlert(false))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Alert);

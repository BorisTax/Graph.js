import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class Register extends React.Component{
    render(){
        const cap=this.props.cap;
        return <div className='modalContainer  noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.title}</span>
                        </div>
                        <div className='loginInputsGroup'>
                            <input placeholder={cap.name}/>
                            <input placeholder={cap.email}/>
                            <input placeholder={cap.password} type="password"/>
                            <input placeholder={cap.passwordAgain} type="password"/>
                        </div>
                        <input type='submit' value='OK'/>
                        <span></span>
                    </div>
                </div>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions.registerForm
    }
}
export default connect(mapStateToProps)(Register);
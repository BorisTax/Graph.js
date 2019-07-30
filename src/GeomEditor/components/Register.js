import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class Register extends React.Component{
    render(){
        return <div className='modalContainer  noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>Registration</span>
                        </div>
                        <div className='loginInputsGroup'>
                            <div>Nickname:<input/></div>
                            <div>E-mail:<input/></div>
                            <div>Password:<input/></div>
                            <div>Password again:<input/></div>
                        </div>
                        <input type='submit' value='OK'/>
                        <span></span>
                    </div>
                </div>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions.about
    }
}
export default connect(mapStateToProps)(Register);
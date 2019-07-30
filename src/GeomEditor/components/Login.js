import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class Login extends React.Component{
    render(){
        return <div className='modalContainer  noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>Login</span>
                        </div>
                        <div className='loginInputsGroup'>
                            <div>Nickname or e-mail:<input/></div>
                            <div>Password:<input/></div>
                        </div>
                        <input type='submit' value='OK'/>
                    </div>
                </div>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions.about
    }
}
export default connect(mapStateToProps)(Login);
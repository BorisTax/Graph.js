import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class Login extends React.Component{
    onRegClick(){
        this.props.history.push('/register')
    }
    render(){
        const cap=this.props.cap;
        return <div className='modalContainer noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.title}</span>
                        </div>
                        <div className='loginInputsGroup'>
                            <div><input placeholder={cap.name}/></div>
                            <div><input placeholder={cap.password} type="password"/></div>
                        </div>
                        <input type='submit' value='OK'/>
                        <input type='button' value={cap.regForm} onClick={this.onRegClick.bind(this)}/>
                    </div>
                </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        cap:store.options.captions.loginForm,
    }
}
export default connect(mapStateToProps)(Login);
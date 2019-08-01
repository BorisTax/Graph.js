import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class Register extends React.Component{
    onSubmit(e){
        e.preventDefault();
    }
    cancel(){
        this.props.history.push('/');
    }
    render(){
        const cap=this.props.cap;
        return <div className='modalContainer  noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.registerForm.title}</span>
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)} className='loginForm'>
                            <input required placeholder={cap.registerForm.name}/>
                            <input required placeholder={cap.registerForm.email}/>
                            <input required placeholder={cap.registerForm.password} type="password"/>
                            <input required placeholder={cap.registerForm.passwordAgain} type="password"/>
                            <input type='submit' value='OK'/>
                            <input type='button' value={cap.buttons.cancel} onClick={this.cancel.bind(this)}/>
                        </form>
                        
                        <span></span>
                    </div>
                </div>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions
    }
}
export default connect(mapStateToProps)(Register);
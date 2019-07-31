import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class Register extends React.Component{
    onSubmit(e){
        e.preventDefault();
    }
    render(){
        const cap=this.props.cap;
        return <div className='modalContainer  noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.title}</span>
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)} className='loginForm'>
                            <input required placeholder={cap.name}/>
                            <input required placeholder={cap.email}/>
                            <input required placeholder={cap.password} type="password"/>
                            <input required placeholder={cap.passwordAgain} type="password"/>
                            <input type='submit' value='OK'/>
                        </form>
                        
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
import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';
import options from '../config'
import Spinner from './Spinner';
import { showAlert, blink } from '../actions/AppActions';

class Register extends React.Component{
    constructor(){
        super()
        this.refName=React.createRef()
        this.refEmail=React.createRef()
        this.refPass1=React.createRef()
        this.refPass2=React.createRef()
        this.state={correct:false,message:"",fetching:false,showPass:false}
    }
    check(name,email,pass1,pass2){
        const cap=this.props.cap.registerForm;
        let messIndex;
        let state={correct:true}
        if(pass2!==pass1) messIndex=3
        if(pass1.length<6) messIndex=2
        if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) messIndex=4
        if(!name.match(/^[a-zA-Z0-9]+([a-zA-Z0-9](_)[a-zA-Z0-9])*[a-zA-Z0-9]+$/)) messIndex=1
        if(name.length<4) messIndex=0
        if(messIndex!==undefined) state={correct:false,message:cap.inputMessages[messIndex]}
        return state;
    }
    onSubmit(e){
        const cap=this.props.cap.registerForm;
        const name=this.refName.current.value;
        const email=this.refEmail.current.value;
        const pass1=this.refPass1.current.value;
        const pass2=this.refPass2.current.value;
        const state=this.check(name,email,pass1,pass2)
        if(state.correct){
            fetch(options.devUrl+'/register',{method:'POST',headers: {"Content-Type": "application/json"},
                    body:JSON.stringify({name:name,email:email,password:pass1})})
                    .then(res=>res.json())
                    .then(res=>{
                        if(res.registered) {
                            this.props.showAlert('regSucceed');
                            this.props.history.push('/');
                        }
                        this.setState({correct:res.registered,fetching:false,message:cap.serverMessages[res.errCode]})
                    })
                    .catch(err=>{this.setState({correct:false,fetching:false,message:cap.serverMessages[5]})})
        }
        this.setState({...state,fetching:true});
        e.preventDefault();
    }
    cancel(){
        this.props.history.push('/');
    }
    componentWillUnmount(){
        window.KEYDOWNHANDLE=true
    }
    componentDidMount(){
        window.KEYDOWNHANDLE=false
        this.ref.style.overflow="hidden"
        this.ref.style.width="0px"
        this.ref.style.transition="width 200ms linear"
        setTimeout(()=>{this.ref.style.width="200px"},10)
    }
    render(){
        const cap=this.props.cap;
        const showPass=this.state.showPass?"text":"password"
        return <div className='modalContainer noselect' onClick={blink}>
                    <div ref={(ref)=>{this.ref=ref}} className={"toolBar center"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.registerForm.title}</span>
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)} className='loginForm'>
                            <input required ref={this.refName} placeholder={cap.registerForm.name}/>
                            <input required ref={this.refEmail} placeholder={cap.registerForm.email} type="email"/>
                            <input required ref={this.refPass1} placeholder={cap.registerForm.password} type={showPass}/>
                            <input required ref={this.refPass2} placeholder={cap.registerForm.passwordAgain} type={showPass}/>
                            <input type='submit' value='OK'/>
                            <input type='button' value={cap.buttons.cancel} onClick={this.cancel.bind(this)}/>
                        </form>
                        <div className="checkbox">
                        <input type="checkbox" id="show" onChange={(e)=>{this.setState({showPass:e.target.checked})}}/><label htmlFor="show">{cap.buttons.showPass}</label>
                        </div>
                        <div className="flexCenter">{this.state.fetching?<Spinner/>:<></>}</div>
                        {!this.state.correct?<span className="errorMessages">{this.state.message}</span>:<></>}
                    </div>
                </div>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        showAlert:(messageKey)=>dispatch(showAlert(true,messageKey))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);
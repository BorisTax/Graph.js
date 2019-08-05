import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';
import { setToken } from '../actions/UserActions';
import options from '../config'
class Login extends React.Component{
    constructor(){
        super();
        this.refName=React.createRef();
        this.refPass=React.createRef();
        this.state={correct:true,logging:false,errCode:0}
    }
    onRegClick(){
        this.props.history.push('/register')
    }
    onSubmit(e){
        const name=this.refName.current.value;
        const pass=this.refPass.current.value;
        this.requestLogin(name,pass);
        e.preventDefault();
    }
    cancel(){
        this.props.history.push('/');
    }
    requestLogin(name,password){
        this.setState({correct:true,logging:true});
        fetch(options.devUrl+'/login',
                    {method:'POST',headers: {"Content-Type": "application/json"},
                    body:JSON.stringify({nameOrEmail:name,password:password})})
            .then(res=>
                res.json())
            .then(res=>{
                this.setState({correct:res.success,logging:false,errCode:res.errCode});
                if(res.success===true) {
                    this.props.setToken(res.token);
                    this.props.history.push('/');
                }
            })
            .catch(e=>{console.error(e); this.setState({correct:false,logging:false,errCode:3});});
    }
    componentWillUnmount(){
        window.KEYDOWNHANDLE=true
    }
    componentDidMount(){
        window.KEYDOWNHANDLE=false
    }
    render(){
        const cap=this.props.cap;
        return <div className='modalContainer noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.loginForm.title}</span>
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)} className='loginForm'>
                            <input name="nameOrEmail" ref={this.refName} required placeholder={cap.loginForm.name}/>
                            <input name="password" ref={this.refPass} required placeholder={cap.loginForm.password} type="password"/>
                            <input type='submit' value='OK'/>
                            <input type='button' value={cap.loginForm.regForm} onClick={this.onRegClick.bind(this)}/>
                            <input type='button' value={cap.buttons.cancel} onClick={this.cancel.bind(this)}/>
                        </form>
                    {this.state.correct===false?<span className="errorMessage">{cap.loginForm.messages[this.state.errCode]}</span>:<></>}
                    {this.state.logging?'Logging...':<></>}
                    </div>
                </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        cap:store.options.captions,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setToken:token=>{dispatch(setToken(token))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
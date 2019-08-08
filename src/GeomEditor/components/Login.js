import React from 'react';
import '../Graph.css';
import '../Buttons.css';
import {connect} from 'react-redux';
import { setToken } from '../actions/UserActions';
import options from '../config'
import Spinner from './Spinner';
class Login extends React.Component{
    constructor(){
        super();
        this.refName=React.createRef();
        this.refPass=React.createRef();
        this.state={correct:true,logging:false,errCode:0,showPass:false,remember:false}
    }
    onRegClick(){
        this.props.history.push('/register')
    }
    onSubmit(e){
        if(this.state.logging)return;
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
                    this.props.setToken(res.token,this.state.remember);
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
        this.ref.style.overflow="hidden"
        this.ref.style.width="0px"
        this.ref.style.transition="width 200ms linear"
        setTimeout(()=>{this.ref.style.width="200px"},10)
    }
    render(){
        const cap=this.props.cap;
        const showPass=this.state.showPass?"text":"password"
        return <div className='modalContainer noselect'>
                    <div ref={(ref)=>{this.ref=ref}}className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.loginForm.title}</span>
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)} className='loginForm'>
                            <input name="nameOrEmail" ref={this.refName} required placeholder={cap.loginForm.name}/>
                            <input name="password" ref={this.refPass} required placeholder={cap.loginForm.password} type={showPass}/>
                            <input type='submit' value='OK'/>
                            <input type='button' value={cap.loginForm.regForm} onClick={this.onRegClick.bind(this)}/>
                            <input type='button' value={cap.buttons.cancel} onClick={this.cancel.bind(this)}/>
                        </form>
                        <div className="checkbox">
                            <input type="checkbox" id="show" onChange={(e)=>{this.setState({showPass:e.target.checked})}}/>
                            <label htmlFor="show">{cap.buttons.showPass}</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="remember" onChange={(e)=>{this.setState({remember:e.target.checked})}}/>
                            <label htmlFor="remember">{cap.loginForm.rememberMe}</label>
                        </div>
                    {this.state.correct===false?<span className="errorMessage">{cap.loginForm.messages[this.state.errCode]}</span>:<></>}
                    <div className="flexCenter">{this.state.logging?<Spinner/>:<></>}</div>
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
        setToken:(token,remember)=>{dispatch(setToken(token,remember))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
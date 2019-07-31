import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';
import { setUser } from '../actions/UserActions';

class Login extends React.Component{
    constructor(){
        super();
        this.refName=React.createRef();
        this.refPass=React.createRef();
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
    requestLogin(name,password){
        fetch('http://localhost:5000/login',
                    {method:'POST',headers: {"Content-Type": "application/json"},
                    body:JSON.stringify({nameOrEmail:name,password:password})})
            .then(res=>res.json())
            .then(res=>console.log(res))
            .catch(e=>console.error(e));
    }
    render(){
        const cap=this.props.cap;
        return <div className='modalContainer noselect'>
                    <div id='help' className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.title}</span>
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)} className='loginInputsGroup'>
                            <input name="nameOrEmail" ref={this.refName} placeholder={cap.name}/>
                            <input name="password" ref={this.refPass} placeholder={cap.password} type="password"/>
                            <input type='submit' value='OK'/>
                            <input type='button' value={cap.regForm} onClick={this.onRegClick.bind(this)}/>
                        </form>
                    </div>
                </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        cap:store.options.captions.loginForm,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setUser:user=>{dispatch(setUser(user))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
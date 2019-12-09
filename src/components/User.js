import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import "../Graph.css";
import { showConfirm } from '../actions/AppActions';
import { logout } from '../actions/UserActions';

class User extends React.Component{
    logout(){
        this.props.showConfirm();
    }
    render(){
        const links=!this.props.user.token?<>
            <NavLink to="/login"><span className="link">{this.props.cap.loginForm.title}</span></NavLink>
            <NavLink to="/register"><span className="link">{this.props.cap.registerForm.title}</span></NavLink>
            </>
            :<NavLink to='/' onClick={this.logout.bind(this)}><span className="link">{this.props.cap.buttons.logout}</span></NavLink>
        return <div className="user noselect">
            {this.props.user.name?this.props.user.name:''}
            
            {links}
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        user:store.user,
        cap:store.options.captions,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        showConfirm:()=>dispatch(showConfirm(true,'logout',logout))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(User)
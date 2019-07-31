import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import "../Graph.css";

class User extends React.Component{
    render(){
        return <div className="user noselect">
            {this.props.user.name}
            <NavLink to="/login"><span className="link">Sign in</span></NavLink>
            <NavLink to="/register"><span className="link">Sign up</span></NavLink>
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        user:store.user
    }
}
export default connect(mapStateToProps)(User)
import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import "../Graph.css";

class User extends React.Component{
    logout(e){
        
    }
    render(){
        const logout=this.props.token?<>
            <NavLink to="/register"><span className="link">Sign up</span></NavLink>
            <NavLink to="/login"><span className="link">Sign in</span></NavLink>
            </>
            :<NavLink onClick={this.onClick.bind(this)}><span className="link">Logout</span></NavLink>
        return <div className="user noselect">
            {this.props.user.name}
            
            {logout}
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        user:store.user
    }
}
export default connect(mapStateToProps)(User)
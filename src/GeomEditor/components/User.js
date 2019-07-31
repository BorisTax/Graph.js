import React from 'react';
import {connect} from 'react-redux'
import "../Graph.css";

class User extends React.Component{
    render(){
        return <div className="user noselect">
            {this.props.user.name}
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        user:store.user
    }
}
export default connect(mapStateToProps)(User)
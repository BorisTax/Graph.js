import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class MySelf extends React.Component{

    render(){
        return <div style={{textAlign: "center"}}>
        <span   ref={this.ref2}
                className={"noselect"}
                style={{position:"relative",whiteSpace:"pre",fontSize:"small"}}
                >
            <hr/>
            {`${this.props.cap.name}          ${this.props.cap.email}`}
            <hr/>
        </span>
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions.about
    }
}
export default connect(mapStateToProps)(MySelf);
import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class MySelf extends React.Component{
    constructor(props){
    super(props);
    this.state={title:`                                                               Author: ${props.name}  E-Mail:${props.email}`}
    }
    componentDidMount(){
        this.interval=setInterval(()=>{
            let newTitle=this.state.title.slice(1,this.state.title.length);
            newTitle+=this.state.title[0];    
            this.setState({title:newTitle});
        },500);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        return <span 
                className={"about noselect"}
                >
            {this.state.title}
        </span>
    }
}
const mapStateToProps=store=>{
    return {
        cap:store.options.captions.about
    }
}
export default connect(mapStateToProps)(MySelf);
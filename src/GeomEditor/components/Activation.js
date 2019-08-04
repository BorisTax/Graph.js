import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';
import options from '../config';

class Activation extends React.Component{
    constructor(){
        super();
        this.state={activated:true,logging:false,errCode:0,message:""}
    }
    onLoginClick(){
        this.props.history.push('/login')
    }
    cancel(){
        this.props.history.push('/');
    }
    activate(id){
        this.setState({activated:false,logging:true});
        fetch(options.devUrl+'/activate',
                    {method:'POST',headers: {"Content-Type": "application/json"},
                    body:JSON.stringify({id:id})})
            .then(res=>res.json())
            .then(res=>{
                this.setState({activated:res.success,logging:false,message:this.props.cap.activation.messages[res.errCode]});
                if(res.success===true) {
                    //this.props.setToken(res.token);
                    //this.props.history.push('/');
                }
            })
            .catch(e=>{console.error(e); this.setState({activated:false,logging:false,errCode:5});});
    }
    componentDidMount(){
        this.activate(this.props.match.params.id)
    }
    render(){
        const cap=this.props.cap;
        //const text=this.cap.activation.messages[this.state.errCode]
        const text=this.state.message
        return <div className='modalContainer noselect'>
                    <div className={"toolBar"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{cap.activation.title}</span>
                        </div>
                        
                        {this.state.logging?<div className="spinner"></div>: 
                        <div>   
                         <div>{text}</div>
                         <input type='button' value={cap.loginForm.title} onClick={this.onLoginClick.bind(this)}/>
                         <input type='button' value={cap.buttons.cancel} onClick={this.cancel.bind(this)}/>
                         </div>}
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
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Activation);
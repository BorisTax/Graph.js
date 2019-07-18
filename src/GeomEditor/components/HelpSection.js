import React from 'react';
import '../Graph.css';
import { relative } from 'path';
import {showHelp} from '../actions/AppActions';
import { connect } from 'react-redux';

class HelpSection extends React.Component{
    t;
    el;
    state={width:0,height:0}
    animate=()=>{
        if(this.state.width<500) this.el.style.width=`${this.state.width}px`;
        if(this.state.height<500) this.el.style.height=`${this.state.height}px`;
        if(this.state.width<500||this.state.height<500) this.setState({width:this.state.width+10,height:this.state.height+10});
    }
    componentDidUpdate(){
       this.t=setTimeout(this.animate,1);
    }
    componentWillUnmount(){
        clearTimeout(this.t);
    }
    componentDidMount(){
        this.el=document.getElementById('help');
        this.canv=document.getElementById('canvas');
        this.forceUpdate();
    }
    render(){
        return <div className='helpContainer'>
            <div style={{display:"inline-block",zIndex:101,border:"1px solid red"}}>
            <div id='help' className={"toolBar helpSectionShow"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption noselect"}>Help</span>
                </div>
            Help
            Help
            Help
            <button onClick={this.props.showHelp.bind(null,false)}>X</button>
        </div>
        </div>
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        show:store.components.showHelp,
    }
};
const mapDispatchToProps=dispatch=>{
    return{
        showHelp:show=>dispatch(showHelp(show))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(HelpSection);

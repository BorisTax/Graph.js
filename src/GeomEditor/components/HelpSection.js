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
        const w=document.body.clientWidth/1.1;
        const h=document.body.clientHeight/1.1;
        if(this.state.width<w) this.el.style.width=`${this.state.width}px`;
        if(this.state.height<h) this.el.style.height=`${this.state.height}px`;
        if(this.state.width<w||this.state.height<h) this.setState({width:this.state.width+20,height:this.state.height+20});
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
        return <div className='helpContainer  noselect' onClick={this.props.showHelp.bind(null,false)}>
            <div style={{display:"inline-block",zIndex:101}}>
            <div id='help' className={"toolBar helpSectionShow"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption"}>{this.props.captions.help.title}</span>
                </div>
            <span className='helpHotKey'>Ctrl-A </span>{this.props.captions.help.ctrlA}<br/>
            <span className='helpHotKey'>Del </span> {this.props.captions.help.del}<br/>
            <span className='helpHotKey'>Mouse wheel +/- </span> {this.props.captions.help.mouseZoom}<br/>
            <span className='helpHotKey'>Mouse middle button down </span>{this.props.captions.help.mouseDrag}<br/>
            
        </div>
        </div>
        </div>
    }
}
const mapStateToProps=store=>{
    return {
        captions:store.options.captions,
    }
};
const mapDispatchToProps=dispatch=>{
    return{
        showHelp:show=>dispatch(showHelp(show))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(HelpSection);

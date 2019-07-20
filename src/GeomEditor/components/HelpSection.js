import React from 'react';
import '../Graph.css';
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
        if(this.state.width<w||this.state.height<h) this.setState({width:this.state.width+50,height:this.state.height+50});
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
        const keys=this.props.captions.help.hotKeys.map((item,i)=><><span className='helpHotKey' key={i}>{item.key} </span> - {item.desc}<br/></>);
        return <div className='helpContainer  noselect' onClick={this.props.showHelp.bind(null,false)}>
            <div style={{display:"inline-block",zIndex:101}}>
            <div id='help' className={"toolBar helpSectionShow"}>
                 <div className={"toolBarHeader"}>
                    <span className={"toolBarCaption"}>{this.props.captions.help.title}</span>
                </div>
            {keys}
            
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

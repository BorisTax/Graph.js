import React,{Fragment} from 'react';
import {showHelp} from '../actions/AppActions';
import { connect } from 'react-redux';
import MySelf from './MySelf';

class HelpSection extends React.Component{
    constructor(){
        super();
        this.ref=React.createRef()
        this.state={done:false}
    }
    
    animate=()=>{
        if(this.w<this.maxw) this.ref.current.style.width=`${this.w}px`;
        if(this.h<this.maxh) this.ref.current.style.height=`${this.h}px`;
        if(this.w>=this.maxw&&this.h>=this.maxh) this.setState({done:true});
        this.w+=50;
        this.h+=50;
    }
    componentWillUnmount(){
        clearInterval(this.t);
        window.KEYDOWNHANDLE=true
    }
    componentDidMount(){
        this.maxw=document.body.clientWidth/1.1;
        this.maxh=document.body.clientHeight/1.1;
        this.w=0;
        this.h=0;
        this.t=setInterval(this.animate,1);
        window.KEYDOWNHANDLE=false
    }
    render(){
        const keys=this.props.captions.help.hotKeys.map((item,i)=><Fragment key={i}><span className='helpHotKey'>{item.key} </span> - {item.desc}<br/></Fragment>);
        return <div className='helpContainer  noselect' onClick={this.props.showHelp.bind(null,false)}>
                <div style={{display:"inline-block",zIndex:101,position:"relative"}}>
                    <div id='help' ref={this.ref} className={"toolBar helpSectionShow"}>
                        <div className={"toolBarHeader"}>
                            <span className={"toolBarCaption"}>{this.props.captions.help.title}</span>
                        </div>
                    {this.state.done?<MySelf/>:<></>}
                    {keys}
                    <div id="pifagor"></div>
                    <div id="evklid"></div>
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

import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';

class MySelf extends React.Component{
    // constructor(){
    //     super();
    //  this.ref=React.createRef()
    //  this.ref2=React.createRef()
    // }
    // componentDidMount(){
    //     let first=true;
    //     this.interval=setInterval(()=>{
    //         const width=this.ref.current.offsetWidth;
    //         const width2=this.ref2.current.offsetWidth;
    //         let left=Number.parseInt(window.getComputedStyle(this.ref2.current).left);
    //         if(first){left=width;first=false}
    //         left-=1;
    //         if(left<-width2) left=width;
    //         this.ref2.current.style.left=`${left}px`;
    //     },20);
    // }
    // componentWillUnmount(){
    //     clearInterval(this.interval);
    // }
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
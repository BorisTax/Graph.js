import React from "react";
import {connect} from 'react-redux';
import { Status } from "../reducers/model";
import { ScreenActions } from "../actions/ScreenActions";
import PickButton from "./PickButton";

class PropertyMultField extends React.Component{
    constructor(props){
        super(props);
        const value={x:props.value.x,y:props.value.y}
        this.state={value:{x:value.x,y:value.y},
                    correct:true,
                    prevValue:{x:value.x,y:value.y},
                    originValue:{x:value.x,y:value.y},
                    focused:false}
    }
    change(e){
        let v={x:this.state.value.x,y:this.state.value.y};
        v[e.target.id]=e.target.value;
        this.setState({value:v});
    }
    blur(){
        if(!this.state.focused)this.setState({value:this.state.originValue})
        //if(this.props.deactivatePoints) this.props.deactivatePoints();
        this.props.setActivePoint(false);
        this.props.repaint();
        window.KEYDOWNHANDLE=true
    }
    focus(){
        if(this.props.deactivatePoints) this.props.deactivatePoints();
        this.props.setActivePoint(true);
        this.setState({focused:true})
        window.KEYDOWNHANDLE=false;
        this.props.repaint();
    }
    onSubmit(e){
        e.preventDefault();
        const v={x:e.target[0].value,y:e.target[1].value};
        //let v=e.target.value;
        const r=this.props.regexp;
        if(v.x.match(r)!==null&&v.y.match(r)!==null) {
            const x=Number.parseFloat(v.x);
            const y=Number.parseFloat(v.y);
            const value=this.state.value;
            value.x=x;
            value.y=y;
            this.props.setProperty(value);
            this.props.repaint();
            this.setState({value:value,correct:true,prevValue:value,originValue:value});
            return;
            }
        this.setState({value:this.state.prevValue})
       return false;
    }
    static getDerivedStateFromProps(nextProps,prevState){
             return {...nextProps,value:nextProps.value,originValue:nextProps.value,correct:true};
    }

    render(){
        const value=this.state.value;
        const [x,xcorrect]=isNaN(+value.x)?[value.x,false]:value.x===""?[value.x,false]:[(+value.x).round4(),true];
        const [y,ycorrect]=isNaN(+value.y)?[value.y,false]:value.y===""?[value.y,false]:[(+value.y).round4(),true];
        return <div className={"noselect"}>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}
                            onBlur={this.blur.bind(this)}
                onFocus={this.focus.bind(this)}>
            <span style={{color:this.props.selected?"red":"black",marginRight:"5px"}}>{this.props.label}</span>
            <form onSubmit={this.onSubmit.bind(this)}>
            <input style={!xcorrect?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={x}
                id='x'
                disabled={this.props.disabled}
                onChange={this.change.bind(this)}
                //onKeyPress={this.onKeyPress.bind(this)}
                //onKeyDown={(e)=>{e.stopPropagation()}}
               // onBlur={this.blur.bind(this)}
                //onFocus={this.focus.bind(this)}
                />
            <input style={!ycorrect?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={y} 
                id='y'
                disabled={this.props.disabled}
                onChange={this.change.bind(this)}
                //onKeyPress={this.onKeyPress.bind(this)}
                //onKeyDown={(e)=>{e.stopPropagation()}}
                //onBlur={this.blur.bind(this)}
                //onFocus={this.focus.bind(this)}
                />
                <input type="submit" value="Set" disabled={this.props.disabled}/>
                </form>
             {this.props.picker?<PickButton 
                active={this.props.status===Status.PICK&&this.props.id===this.props.editId} 
                onClick={()=>{
                    if(this.props.status===Status.PICK&&this.props.id===this.props.editId){this.props.abort();return;}   
                    this.props.pickProperty(this.props.id,new this.props.picker());
                    if(this.props.deactivatePoints) this.props.deactivatePoints();
                    this.props.setActivePoint(true);
                 }}></PickButton>:<></>}
            </div>
        </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        editId:store.model.pickedEditId,
        status:store.model.status,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        cancel:()=>dispatch(ScreenActions.cancel()),
        abort:()=>dispatch(ScreenActions.abort()),
        repaint:()=>dispatch(ScreenActions.repaint()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyMultField)
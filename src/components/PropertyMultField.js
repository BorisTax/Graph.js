import "../Graph.css";
import React from "react";
import {connect} from 'react-redux';
import { Status } from "../reducers/screen";
import { ScreenActions } from "../actions/ScreenActions";
import PickButton from "./PickButton";

class PropertyMultField extends React.Component{
    constructor(props){
        super(props);
        const value={x:props.value.x,y:props.value.y}
        this.state={value:{x:value.x,y:value.y},correct:true,prevValue:{x:value.x,y:value.y},originValue:{x:value.x,y:value.y}}
    }
    change(e){
        let v={x:this.state.value.x,y:this.state.value.y};
        v[e.target.id]=e.target.value;
        const r=this.props.regexp;
        const corr=v[e.target.id].match(r)!=null&&v[e.target.id]!=="";
        if(corr)this.setState({value:{x:v.x,y:v.y},prevValue:{x:v.x,y:v.y}}); 
          else{
          const value=this.state.prevValue
          if(v[e.target.id]==='') value[e.target.id]='';
          this.setState({value:value})}
    }
    blur(){
        //this.props.setActivePoint('');
        this.setState({value:this.state.originValue})
        window.KEYDOWNHANDLE=true
    }
    focus(){
        this.props.setActivePoint(this.props.propKey);
        window.KEYDOWNHANDLE=false;
    }
    onKeyPress(e){
        if(e.charCode===13){
            let v=e.target.value;
            v=v===''?"0":v;
            const r=this.props.regexp;
            if(v.match(r)!==null) {
                const n=Number.parseFloat(v);
                const value=this.state.value;
                value[e.target.id]=n;
                this.props.setProperty(this.props.propKey,value);
                this.setState({value:value,correct:true,prevValue:value});
                return;
                }
            this.setState({value:this.state.prevValue})
        }
       return false;
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
            let value=(nextProps.status===Status.PICK_END&&nextProps.id===nextProps.editId)?nextProps.pickedValue:prevState.value;
            value.x=+value.x.toFixed(4)
            value.y=+value.y.toFixed(4)
            return {...nextProps,value:value,originValue:nextProps.value,correct:true};
    }
    componentDidUpdate(){
        if(this.props.status===Status.PICK_END&&this.props.propKey===this.props.editId) {
           this.props.setProperty(this.props.propKey,this.state.value)
           this.props.cancel();
        }
    }
    render(){
        const value=this.state.value;
        return <div className={"noselect"}>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
            {this.props.label}
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={value.x} 
                id='x'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={this.focus.bind(this)}
                />
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={value.y} 
                id='y'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={this.focus.bind(this)}
                />
             {this.props.picker?<PickButton 
                active={this.props.status===Status.PICK&&this.props.id===this.props.editId} 
                onClick={()=>{
                    if(this.props.status===Status.PICK&&this.props.id===this.props.editId){this.props.cancel();return;}   
                    this.props.setPickedData(this.state.value);
                    this.props.startPicking(this.props.id,new this.props.picker());
                    this.props.setActivePoint(this.props.propKey);
                        
                 }}></PickButton>:<></>}
            </div>
        </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        pickedValue:store.screen.pickedData.data,
        editId:store.screen.pickedData.editId,
        status:store.screen.status,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        startPicking:(id,picker)=>dispatch(ScreenActions.startPicking(id,picker)),
        setPickedData:data=>dispatch(ScreenActions.setPickedData(data)),
        cancel:()=>dispatch(ScreenActions.cancel()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyMultField)
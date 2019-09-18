import "../Graph.css";
import React from "react";
import {connect} from 'react-redux';
import { STATUS_PICK } from "../reducers/screen";
import { startPicking, setPickedData, fixPickedData } from "../actions/ScreenActions";

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
        const corr=v[e.target.id].match(r)!=null;
        if(corr)this.setState({value:{x:v.x,y:v.y},prevValue:{x:v.x,y:v.y},originValue:{x:v.x,y:v.y}}); 
          else{
          const value=this.state.prevValue
          if(v[e.target.id]==='') value[e.target.id]='';
          this.setState({value:value})}
    }
    blur(){
        this.setState({value:this.state.originValue})
        window.KEYDOWNHANDLE=true
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
        //if(nextProps.value===prevState.value){
            const value=(nextProps.status===STATUS_PICK&&nextProps.id===nextProps.editId)?nextProps.pickedValue:prevState.value;
            return {...nextProps,value:value,originValue:nextProps.value,correct:true};
           //  }
          //  else return {...prevState}
    }
    componentDidUpdate(){
        if(this.props.fix===true) {
           this.props.setProperty(this.props.propKey,this.state.value)
           this.props.fixPickedData(false)
        }
    }
    render(){
        //const value=(this.props.status===STATUS_PICK&&this.props.id===this.props.editId)?this.props.pickedValue:this.state.value;
        const value=this.state.value;
        return <div className={"noselect"}>
            {this.props.label}
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={value.x.toFixed(4)} 
                id='x'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={()=>{window.KEYDOWNHANDLE=false}}
                />
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={value.y.toFixed(4)} 
                id='y'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={()=>{window.KEYDOWNHANDLE=false}}
                />
             <button onClick={()=>{
                 this.props.setPickedData(this.state.value);
                 this.props.startPicking(this.props.id,new this.props.picker())}}>+</button>
        </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        pickedValue:store.screen.pickedData.data,
        editId:store.screen.pickedData.editId,
        fix:store.screen.pickedData.fix,
        status:store.screen.status,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        startPicking:(id,picker)=>dispatch(startPicking(id,picker)),
        setPickedData:data=>dispatch(setPickedData(data)),
        fixPickedData:fix=>dispatch(fixPickedData(fix)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyMultField)
import "../Graph.css";
import React from "react";
import PickButton from "./PickButton";
import { Status } from "../reducers/screen";
import { connect } from "react-redux";
import { startPicking, setPickedData, cancel } from "../actions/ScreenActions";

class PropertyField extends React.Component{
    constructor(props){
        super(props);
        this.state={value:props.value.toFixed(4),correct:true,prevValue:props.value.toFixed(4),originValue:props.value.toFixed(4)}
    }
    change(e){
        let v=e.target.value;
        const r=this.props.regexp;
        const corr=v.match(r)!=null;
        if(corr)this.setState({value:v,prevValue:v}); 
          else
          this.setState({value:v===''?'':this.state.prevValue})
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
                this.props.setProperty(this.props.propKey,n);
                this.setState({value:n,correct:true,prevValue:n});
                return;
                }
            this.setState({value:this.state.prevValue})
        }
       return false;
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
        let value=(nextProps.status===Status.PICK_END&&nextProps.id===nextProps.editId)?nextProps.pickedValue:prevState.value;
        value=(+value).toFixed(4)
        return {...nextProps,value:value,originValue:nextProps.value,correct:true};
    }
    componentDidUpdate(){
        if(this.props.status===Status.PICK_END&&this.props.propKey===this.props.editId) {
           this.props.setProperty(this.props.propKey,+this.state.value)
           this.props.cancel();
        }
    }
    render(){
        return <div className={"noselect"}>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
            {this.props.label}
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyField'
                type="text" value={this.state.value} 
                id={this.props.label}
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={()=>{window.KEYDOWNHANDLE=false}}
                />
            {this.props.picker?<PickButton
                active={this.props.status===Status.PICK&&this.props.id===this.props.editId} 
                onClick={()=>{
                    if(this.props.status===Status.PICK&&this.props.id===this.props.editId){this.props.cancel();return;}   
                    this.props.setPickedData(this.state.value);
                    this.props.startPicking(this.props.id,new this.props.picker());
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
        startPicking:(id,picker)=>dispatch(startPicking(id,picker)),
        setPickedData:data=>dispatch(setPickedData(data)),
        cancel:()=>dispatch(cancel()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyField)
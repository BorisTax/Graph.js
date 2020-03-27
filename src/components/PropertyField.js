import React from "react";
import PickButton from "./PickButton";
import { Status } from "../reducers/screen";
import { connect } from "react-redux";
import { ScreenActions } from "../actions/ScreenActions";

class PropertyField extends React.Component{
    constructor(props){
        super(props);
        this.state={value:props.value.toFixed(4),correct:true,prevValue:props.value.toFixed(4),originValue:props.value.toFixed(4)}
    }
    change(e){
        let v=e.target.value;
        this.setState({value:v})
    }
    blur(){
        this.setState({value:this.state.originValue})
        window.KEYDOWNHANDLE=true
    }
    onKeyPress(e){
        if(e.charCode===13){
            let v=e.target.value;
            const r=this.props.regexp;
            if(v.match(r)!==null) {
                const n=Number.parseFloat(v);
                this.props.setProperty(this.props.propKey,n,this.props.type);
                this.setState({value:n,correct:true,prevValue:n});
                return;
                }
            this.setState({value:this.state.prevValue})
        }
       return false;
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
         return {...nextProps,value:nextProps.value,originValue:nextProps.value,correct:true};
     }

    render(){
        const v=this.state.value;
        const [value,correct]=isNaN(+v)?[v,false]:v===""?[v,false]:[(+v).round4(),true];
        return <div className={"noselect"}>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
            <span style={{color:this.props.selected?"red":"black",marginRight:"5px"}}>{this.props.label}</span>
            <input style={!correct?{backgroundColor:'red'}:{}}
                className='propertyField'
                type="text" value={value} 
                id={this.props.label}
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={()=>{window.KEYDOWNHANDLE=false}}
                />
            {this.props.picker?<PickButton
                active={this.props.status===Status.PICK&&this.props.id===this.props.pickedEditId} 
                onClick={()=>{
                    if(this.props.status===Status.PICK&&this.props.id===this.props.editId){this.props.cancel();return;}   
                    this.props.pickProperty(this.props.id,this.props.propKey,new this.props.picker());
                 }}></PickButton>:<></>}
        </div>
        </div>
    }
}
const mapStateToProps=(store)=>{
    return {
        editId:store.screen.pickedEditId,
        status:store.screen.status,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        cancel:()=>dispatch(ScreenActions.cancel()),
        abort:()=>dispatch(ScreenActions.abort()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyField)
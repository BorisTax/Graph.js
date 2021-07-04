import React from "react";
import PickButton from "./PickButton";
import { Status } from "../reducers/model";
import { connect } from "react-redux";
import { ScreenActions } from "../actions/ScreenActions";

class PropertyField extends React.Component{
    constructor(props){
        super(props);
        this.state={value:props.value,correct:true,prevValue:props.value,originValue:props.value}
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
            if (!this.props.test){
                if(v.match(r)!==null) {
                    const n=Number.parseFloat(v);
                    this.props.setProperty(n);
                    this.setState({value:n,correct:true,prevValue:n});
                    return;
                    }
            }else{
                if(this.props.test(v)) {
                    this.props.setProperty(v);
                    this.setState({value:v,correct:true,prevValue:v});
                    return;
                    }
            }
            this.setState({value:this.state.prevValue})
        }
       return false;
        
    }
    // static getDerivedStateFromProps(nextProps,prevState){
    //      return {...nextProps,value:nextProps.value,originValue:nextProps.value,correct:true};
    //  }

    render(){
        const v=this.state.value;
        const [value,correct]=[v,this.props.test(v)];
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
                    this.props.pickProperty(this.props.id,new this.props.picker());
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
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyField)
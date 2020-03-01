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
        //const r=this.props.regexp;
        //const corr=v[e.target.id].match(r)!=null&&v[e.target.id]!=="";
        this.setState({value:v});
        // if(corr)this.setState({value:{x:+v.x,y:+v.y},prevValue:{x:+v.x,y:+v.y}}); 
        //   else{
        //   // const value=this.state.prevValue
        //   //if(v[e.target.id]==='') value[e.target.id]='';
        //   //this.setState({value:value})
        // }
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
            //v=v===''?"0":v;
            const r=this.props.regexp;
            if(v.match(r)!==null) {
                const n=Number.parseFloat(v);
                const value=this.state.value;
                value[e.target.id]=n;
                this.props.setProperty(this.props.propKey,value,this.props.type);
                this.setState({value:value,correct:true,prevValue:value});
                return;
                }
            this.setState({value:this.state.prevValue})
        }
       return false;
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
            let value=(nextProps.status===Status.PICK_END&&nextProps.id===nextProps.editId)?nextProps.pickedValue.value:prevState.value;
            // const x=+value.x;
            // const y=+value.y;
            // if(!isNaN(x)) value.x=+(x.toFixed(4));
            // if(!isNaN(y)) value.y=+(y.toFixed(4));
            return {...nextProps,value:value,originValue:nextProps.value,correct:true};
    }
    componentDidUpdate(){
        if(this.props.status===Status.PICK_END&&this.props.propKey===this.props.editId) {
           this.props.setProperty(this.props.propKey,this.state.value,this.props.type);
           this.props.abort();
        }
    }
    render(){
        const value=this.state.value;
        const [x,xcorrect]=isNaN(+value.x)?[value.x,false]:value.x===""?[value.x,false]:[(+value.x).round4(),true];
        const [y,ycorrect]=isNaN(+value.y)?[value.y,false]:value.y===""?[value.y,false]:[(+value.y).round4(),true];
        return <div className={"noselect"}>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
            <span style={{color:this.props.selected?"red":"black",marginRight:"5px"}}>{this.props.label}</span>
            <input style={!xcorrect?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={x} 
                id='x'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={this.focus.bind(this)}
                />
            <input style={!ycorrect?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={y} 
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
        abort:()=>dispatch(ScreenActions.abort())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PropertyMultField)
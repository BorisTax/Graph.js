import "../Graph.css";
import React from "react";

class PropertyMultField extends React.Component{
    constructor(props){
        super(props);
        const value={x:props.value.x.toFixed(4),y:props.value.y.toFixed(4)}
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
        if(nextProps.value===prevState.value)
            return {...nextProps,originValue:nextProps.value,correct:true};
            else return {...prevState}
    }
    render(){
        return <div className={"noselect"}>
            {this.props.label}
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={this.state.value.x} 
                id='x'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={()=>{window.KEYDOWNHANDLE=false}}
                />
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                className='propertyMultField'
                type="text" value={this.state.value.y} 
                id='y'
                onChange={this.change.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={(e)=>{e.stopPropagation()}}
                onBlur={this.blur.bind(this)}
                onFocus={()=>{window.KEYDOWNHANDLE=false}}
                />
        </div>
    }
}
export default PropertyMultField
import "../Graph.css";
import React from "react";

class PropertyField extends React.Component{
    constructor(props){
        super(props);
        this.state={value:props.value.toFixed(4),correct:true,prevValue:props.value}
    }
    change(e){
        let v=e.target.value;
        const r=this.props.regexp;
        const corr=v.match(r)!=null;
        if(corr)this.setState({value:v,prevValue:v}); 
          else
          this.setState({value:v==''?'':this.state.prevValue})
    }
    onKeyPress(e){
        if(e.charCode==13){
            let v=e.target.value;
            v=v==''?"0":v;
            const r=this.props.regexp;
            if(v.match(r)!=null) {
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
        if(nextProps.value===prevState.value)
        return {...nextProps,correct:true};
        else return {...prevState}
    }
    render(){
        return <div className={"noselect"}>
            {this.props.label}=
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                    type="text" value={this.state.value} 
                    onChange={this.change.bind(this)}
                    onKeyPress={this.onKeyPress.bind(this)}/>
        </div>
    }
}
export default PropertyField
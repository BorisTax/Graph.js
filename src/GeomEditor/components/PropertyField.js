import "../Graph.css";
import React from "react";

class PropertyField extends React.Component{
    constructor(props){
        super(props);
        this.state={...props,correct:true}
    }
    change(e){
        let v=e.target.value;
        const r=this.props.regexp;
        const corr=v.match(r)!=null;
        this.setState({value:v,correct:corr});
    }
    onKeyPress(e){
        if(e.charCode==13){
            let v=e.target.value;
            const r=this.props.regexp;
            if(v.match(r)!=null) {
                this.props.setProperty(this.state.label,Number.parseFloat(v));
                this.setState({value:Number.parseFloat(v),correct:true});
                }
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
            {this.state.label}=
            <input style={!this.state.correct?{backgroundColor:'red'}:{}}
                    type="text" value={this.state.value} 
                    onChange={this.change.bind(this)}
                    onKeyPress={this.onKeyPress.bind(this)}/>
        </div>
    }
}
export default PropertyField
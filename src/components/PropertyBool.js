import React from "react";


export default class PropertyBool extends React.Component{
    change(e){
        //let v=e.target.checked;
        //this.setState({value:v});
        this.props.setProperty(e.target.checked);
    }
    // static getDerivedStateFromProps(nextProps,prevState){
    //      return {...nextProps};
    //  }
    render(){
        //const v=this.props.value;
        return <div className={"noselect"}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
            <input 
                className=''
                type="checkbox" value={this.props.value} 
                id={this.props.label}
                onChange={this.change.bind(this)}
                />
            <span style={{marginLeft:"5px"}}>{this.props.label}</span>
        </div>
        </div>
    }
}


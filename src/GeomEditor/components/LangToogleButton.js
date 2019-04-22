import React from 'react';
import '../Graph.css';

export default class LangToggleButton extends React.Component{
    onClick(){
        if(!this.props.pressed){
            fetch('./locale/lang.php?lang='+this.props.lang)
                .then(res=>res.json())
                .then(capt=>this.props.setLanguage(capt))
                .catch(e=>{console.error(e)});
            this.props.setActiveLangButtonId(this.props.lang);
        }
    }
    render(){
        let className=this.props.pressed?"langToggleButtonDown":"langToggleButtonUp";
        return <div 
                id={this.props.lang}
                className={className+" noselect"}
                onClick={this.onClick.bind(this)}
                >
            
        </div>
    }
}
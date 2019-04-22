import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import LangToggleButton from './LangToogleButton';
import {setActiveLangButton} from '../actions/ComponentActions';
import {setLanguage} from '../actions/AppActions';

class LangToggleBar extends React.Component{
    render(){
        return <div className={"langToggleBar"}>
            <LangToggleButton 
                lang="RUS"
                pressed={this.props.pressed==="RUS"}
                setActiveLangButtonId={this.props.setActiveLangButtonId}
                setLanguage={this.props.setLanguage}
                />
            <LangToggleButton
                lang="ENG"
                pressed={this.props.pressed==="ENG"}
                setActiveLangButtonId={this.props.setActiveLangButtonId}
                setLanguage={this.props.setLanguage}
                />
        </div>
    }
}

const mapStateToProps = store=>{
    return{
        pressed:store.components.activeLangButton,
    }
};
const mapDispatchToProps = dispatch=>{
    return {
        setActiveLangButtonId:lang=>dispatch(setActiveLangButton(lang)),
        setLanguage:capt=>dispatch(setLanguage(capt)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LangToggleBar);
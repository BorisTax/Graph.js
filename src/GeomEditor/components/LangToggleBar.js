import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import LangToggleButton from './LangToogleButton';
import {setActiveLangButton} from '../actions/ComponentActions';
import {requestLanguage} from '../actions/AppActions';

class LangToggleBar extends React.Component{
    render(){
        return <div className={"langToggleBar"}>
            <LangToggleButton 
                lang="RUS"
                pressed={this.props.pressed==="RUS"}
                setActiveLangButtonId={this.props.setActiveLangButtonId}
                requestLanguage={this.props.requestLanguage}
                />
            <LangToggleButton
                lang="ENG"
                pressed={this.props.pressed==="ENG"}
                setActiveLangButtonId={this.props.setActiveLangButtonId}
                requestLanguage={this.props.requestLanguage}
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
        requestLanguage:lang=>dispatch(requestLanguage(lang)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LangToggleBar);
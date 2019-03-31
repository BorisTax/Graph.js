import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import LangToggleButton from './LangToogleButton';
import {setActiveLangButtonId} from '../actions/ComponentActions';
class LangToggleBar extends React.Component{
    render(){
        return <div className={"langToggleBar"}>
            <LangToggleButton 
                lang="RUS"
                pressed={this.props.pressed=="RUS"}
                setActiveLangButtonId={this.props.setActiveLangButtonId}
                />
            <LangToggleButton
                lang="ENG"
                pressed={this.props.pressed=="ENG"}
                setActiveLangButtonId={this.props.setActiveLangButtonId}
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
        setActiveLangButtonId:lang=>dispatch(setActiveLangButtonId(lang)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LangToggleBar);